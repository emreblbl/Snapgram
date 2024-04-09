import { INewUser } from '@/types'
import { useQuery, 
        useMutation,
        useQueryClient,
        useInfiniteQuery,
} from '@tanstack/react-query'

import { createUserAccount, signInAccount } from '@/lib/appwrite/api'

// fetching data and caching it and infiniite scroll

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user : INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user : { 
            email: string;
            password: string;
        }
        ) => signInAccount(user), 
    })
}