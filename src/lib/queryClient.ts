import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export {
    useQuery,
    useQueryClient,
    queryClient,
    QueryClientProvider
}