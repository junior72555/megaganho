"use client"
import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransaction } from "@/contexts/TransactionContext";
import { TransactionNameType, TransactionStatus, TransactionStatusColor } from "@/contexts/TransactionContext/types";
import { formatBRL } from "@/utils/currency";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

export default function Transaction() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { transactions, fetchTransactions, isLoading } = useTransaction()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <div className="rounded bg-zinc-700 p-6">
      <h2 className="text-white text-lg font-bold mb-4 uppercase">Minhas Transações</h2>

      <div className="space-y-4">
        <div className="scrollhidden flex gap-2 overflow-x-auto">
          <div
            onClick={() => {
              router.push(pathname + '?' + createQueryString('filter[name]', ''));
            }}
            className={`${searchParams.get('filter[name]') == '' || !searchParams.has('filter[name]') ? 'bg-green-500 text-zinc-950' : 'text-green-500'} flex items-center justify-center cursor-pointer uppercase hover:bg-green-500 hover:text-zinc-950 border border-green-500 font-bold text-xs p-1 rounded`}
          >
            Todos
          </div>
          <div
            onClick={() => {
              router.push(pathname + '?' + createQueryString('filter[name]', 'deposit'));
            }}
            className={`${searchParams.get('filter[name]') == 'deposit' ? 'bg-green-500 text-zinc-950' : 'text-green-500'} flex items-center justify-center cursor-pointer uppercase hover:bg-green-500 hover:text-zinc-950 border border-green-500 font-bold text-xs p-1 rounded`}
          >
            DEPOSITOS
          </div>
          <div
            onClick={() => {
              router.push(pathname + '?' + createQueryString('filter[name]', 'cashout'));
            }}
            className={`${searchParams.get('filter[name]') == 'cashout' ? 'bg-green-500 text-zinc-950' : 'text-green-500'} flex items-center justify-center cursor-pointer uppercase hover:bg-green-500 hover:text-zinc-950 border border-green-500 font-bold text-xs p-1 rounded`}
          >
            SAQUES
          </div>
          <div
            onClick={() => {
              router.push(pathname + '?' + createQueryString('filter[name]', 'cassino'));
            }}
            className={`${searchParams.get('filter[name]') == 'cassino' ? 'bg-green-500 text-zinc-950' : 'text-green-500'} flex items-center justify-center cursor-pointer uppercase hover:bg-green-500 hover:text-zinc-950 border border-green-500 font-bold text-xs p-1 rounded`}
          >
            Cassino
          </div>
          <div
            onClick={() => {
              router.push(pathname + '?' + createQueryString('filter[name]', 'bonus,rollover'));
            }}
            className={`${searchParams.get('filter[name]') == 'bonus,rollover' ? 'bg-green-500 text-zinc-950' : 'text-green-500'} flex items-center justify-center cursor-pointer uppercase hover:bg-green-500 hover:text-zinc-950 border border-green-500 font-bold text-xs p-1 rounded`}
          >
            Bônus
          </div>
          <div
            onClick={() => {
              router.push(pathname + '?' + createQueryString('filter[name]', 'affiliate_cpa,affiliate_revenue_share'));
            }}
            className={`${searchParams.get('filter[name]') == 'bonus,rollover' ? 'bg-green-500 text-zinc-950' : 'text-green-500'} flex items-center justify-center cursor-pointer uppercase hover:bg-green-500 hover:text-zinc-950 border border-green-500 font-bold text-xs p-1 rounded`}
          >
            Affiliado
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center pt-4">
            <div className='rounded-full border-r-green-900 border-b-green-900 border-4 border-green-500 h-8 w-8 animate-spin'></div>
          </div>
        )}

        {!isLoading && transactions && transactions.data.length > 0 && (
          <>
            <div className="relative overflow-x-auto">
              <table className=" w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-white uppercase border-b border-green-500">
                  <tr>
                    <th scope="col" className="px-6 py-2">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Fonte
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Valor
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Saldo
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-600">
                  {transactions.data.map((transaction, index) => (
                    <tr key={index} className="hover:bg-zinc-800 odd:bg-zinc-800/20">
                      <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                        {transaction.type == 'debit' ? (
                          <div className="bg-red-500 text-black flex items-center justify-center rounded w-5 h-5">
                            <ArrowDownIcon className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="bg-green-500 text-black flex items-center justify-center rounded w-5 h-5">
                            <ArrowUpIcon className="h-4 w-4" />
                          </div>
                        )}
                      </th>
                      <td className="px-6 py-2">
                        {TransactionNameType[transaction.name]}
                      </td>
                      <td className="px-6 py-2">
                        {formatBRL(transaction.amount / 100)}
                      </td>
                      <td className="px-6 py-2">
                        {transaction.balance_type == 'wallet' ? 'Real' : 'Bônus'}
                      </td>
                      <td className="px-6 py-2">
                        <div className={`${'border-' + TransactionStatusColor[transaction.status] + '-500'} border text-white flex items-center justify-center rounded p-0.5`}>
                          {TransactionStatus[transaction.status]}
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        {transaction.created_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* hack para o tailwind usar as classes das bordas */}
              <div className="hidden border-red-500"></div>
              <div className="hidden border-yellow-500"></div>
              <div className="hidden border-gray-500"></div>
              <div className="hidden border-green-500"></div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 gap-y-1 mt-3">
              <div className="text-sm">Exibindo {transactions.meta.from} a {transactions.meta.to} de {transactions.meta.total} registros</div>

              <div className="flex items-center justify-end rounded overflow-hidden text-sm font-bold">

                {transactions.meta.links.map((link, index) => (
                  <div
                    key={index}
                    className={`${link.active ? 'bg-zinc-500' : (link.url == null) ? 'bg-zinc-900' : 'bg-zinc-900 hover:bg-zinc-950 '} w-10 h-10 flex items-center justify-center cursor-pointer`}
                    onClick={() => {
                      let pageNumber: any = link.label

                      if (link.url == null) return;

                      if (link.label == '&laquo; Anterior') {
                        pageNumber = Number(transactions.meta.current_page) - 1;
                      }

                      if (link.label == 'Próximo &raquo;') {
                        pageNumber = Number(transactions.meta.current_page) + 1;
                      }

                      router.push(pathname + '?' + createQueryString('page', pageNumber));
                    }}
                  >
                    {link.label.replace('&laquo; Anterior', '«').replace('Próximo &raquo;', '»')}
                  </div>
                ))}

              </div>
            </div>
          </>
        )}

        {!isLoading && transactions && transactions.data.length == 0 && (
          <div className="relative text-center rounded-lg bg-green-900/30 text-green-500 font-bold text-xs p-4">
            Não ha informações para exibir.
          </div>
        )}
      </div>
    </div >
  )
}