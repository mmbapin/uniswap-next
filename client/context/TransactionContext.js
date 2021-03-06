import React, {useState, useEffect} from 'react'

export const TransactionContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
    eth = window.ethereum
}

const FUNNY_MESSAGE = 'you Suck'

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState()
		useEffect(() => {
			checkIfWalletIsConnected()
		}, [])


    const connectWallet = async (metamask = eth) => {
        try {
            if(!metamask) return alert('Please Install Metamask.')
            const accounts = await metamask.request({method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
        } catch (error) {
           console.error(error)
           throw new Error('No ethureum Object.') 
        }
    }

    const checkIfWalletIsConnected = async (metamask = eth) => {
			try {
				if(!metamask) return alert("Please Install metamask")
				const accounts = await metamask.request({method: 'eth_accounts'})
				if(accounts.length){
					setCurrentAccount(accounts[0])
					console.log("Wallet is already connected.");
				}	
			} catch (error) {
					console.error(error)
					throw new Error('No ethereum object.')
			}
    }

    return (
        <TransactionContext.Provider
            value={{
                currentAccount,
                connectWallet,
                FUNNY_MESSAGE
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

