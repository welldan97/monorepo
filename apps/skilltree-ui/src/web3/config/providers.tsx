import { SUPPORTED_CHAINS } from './chains'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal as Web3ModalComponent } from '@web3modal/react'
import React, { ReactNode } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'

if (!process.env.REACT_APP_WALLETCONNECT_KEY) {
  throw new Error('MISSING OR INVALID WALLET_CONNECT KEY! PLEASE SET ONE IN YOUR ENV FILES')
}

// Wagmi client
const { provider } = configureChains(SUPPORTED_CHAINS, [
  walletConnectProvider({ projectId: process.env.REACT_APP_WALLETCONNECT_KEY }),
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: process.env.REACT_APP_WALLETCONNECT_KEY,
    version: '2',
    appName: 'PSTL SKILLTREE',
    chains: SUPPORTED_CHAINS,
  }),
  provider,
})

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, SUPPORTED_CHAINS)

export const WagmiProvider: React.FC<{
  children?: ReactNode
}> = ({ children }) => <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>

export const Web3Modal = () => {
  if (!process.env.REACT_APP_WALLETCONNECT_KEY) {
    throw new Error('MISSING OR INVALID WALLET_CONNECT KEY! PLEASE SET ONE IN YOUR ENV FILES')
  }
  return <Web3ModalComponent projectId={process.env.REACT_APP_WALLETCONNECT_KEY} ethereumClient={ethereumClient} />
}
