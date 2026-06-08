import { useCallback, useState } from 'react'
import type { TOrder } from '@/types'
import { mockOrders } from '@/data/orders'

export function useOrders() {
  const [orders, setOrders] = useState<TOrder[]>(mockOrders)
  const [activeOrder, setActiveOrder] = useState<TOrder | null>(mockOrders.find(o => o.status !== 'delivered') ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      // Future: const res = await ordersApi.list()
      // setOrders(res.data)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  const fetchActiveOrder = useCallback(async () => {
    setIsLoading(true)
    try {
      // Future: const res = await ordersApi.getActive()
      // setActiveOrder(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const acceptOrder = useCallback(async (orderId: string) => {
    try {
      // Future: await ordersApi.acceptOrder(orderId)
      return true
    } catch {
      return false
    }
  }, [])

  return { orders, activeOrder, isLoading, isRefreshing, refresh, fetchActiveOrder, acceptOrder }
}
