import { TypeormDatabase } from '@subsquid/typeorm-store';
import {EvmBatchProcessor} from '@subsquid/evm-processor'
import { Transfer } from './model';
import { events } from './abi/MetaCoin';

const contractAddress = "0xc0bb32fc688c4cac4417b8e732f26836c594c258".toLowerCase()
const processor = new EvmBatchProcessor()
  .setDataSource({
    chain: "http://localhost:8545",
    archive: "http://localhost:8080",
  })
  .addLog(contractAddress, {
    filter: [[events.Transfer.topic]],
    data: {
      evmLog: {
        topics: true,
        data: true,
      },
      transaction: {
        hash: true,
      },
    },
  });

processor.run(new TypeormDatabase(), async (ctx) => {
  const transfers: Transfer[] = []
  for (let c of ctx.blocks) {
    for (let i of c.items) {

      if (i.address === contractAddress && i.kind === "evmLog"){
        if (i.evmLog.topics[0] === events.Transfer.topic) {

          const { _from, _to, _value } = events.Transfer.decode(i.evmLog)

          transfers.push(new Transfer({
            id: `${String(c.header.height).padStart(10, '0')}-${i.transaction.hash.slice(3,8)}`,
            block: c.header.height,
            from: _from,
            to: _to,
            value: _value.toBigInt(),
            timestamp: BigInt(c.header.timestamp),
            txHash: i.transaction.hash
          }))
        }
      }
    }
   }
   await ctx.store.save(transfers)
});

