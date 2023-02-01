import { TypeormDatabase } from '@subsquid/typeorm-store';
import {EvmBatchProcessor} from '@subsquid/evm-processor'
import { lookupArchive } from '@subsquid/archive-registry'
import assert from 'assert';
import { Burn } from './model';

const processor = new EvmBatchProcessor()
  .setDataSource({
    chain: "localhost:8545",
    archive: "localhost:8080",
  })
  .addTransaction([
    '0x0000000000000000000000000000000000000000'
  ], {
    range: {
      from: 6_000_000
    },
    data: {
      transaction: {
        from: true,
        value: true,
        hash: true
      }
    }
  });

function formatID(height:any, hash:string) {
  return `${String(height).padStart(10, '0')}-${hash.slice(3,8)}` 

} 

processor.run(new TypeormDatabase(), async (ctx) => {
  const burns: Burn[] = []
  for (let c of ctx.blocks) {
    for (let i of c.items) {
      assert(i.kind == 'transaction')
      // decode and normalize the tx data
      burns.push(new Burn({
        id: formatID(c.header.height, i.transaction.hash),
        block: c.header.height,
        address: i.transaction.from,
        value: i.transaction.value,
        txHash: i.transaction.hash
      }))
    }
   }
   // apply vectorized transformations and aggregations
   const burned = burns.reduce((acc, b) => acc + b.value, 0n)/1_000_000_000n
   const startBlock = ctx.blocks.at(0)?.header.height
   const endBlock = ctx.blocks.at(-1)?.header.height
   ctx.log.info(`Burned ${burned} Gwei from ${startBlock} to ${endBlock}`)

   // upsert batches of entities with batch-optimized ctx.store.save
   await ctx.store.save(burns)
});

