import { Column, Row } from '@past3lle/components'
import { useCopyClipboard, useIsSmallMediaWidth } from '@past3lle/hooks'
import { truncateAddress } from '@past3lle/utils'
import React, { memo, useCallback, useMemo } from 'react'
import { useTheme } from 'styled-components'

import { ModalPropsCtrlState } from '../../../controllers/types/controllerTypes'
import { useConnectDisconnect, usePstlWeb3Modal, useUserConnectionInfo } from '../../../hooks'
import { useConnectedChainAndWalletLogo } from '../../../hooks/useLogos'
import { PstlModalTheme } from '../../../theme'
import { ConnectorEnhanced } from '../../../types'
import { BaseModalProps, ModalId } from '../common/types'
import { WalletChainLogos } from './WalletChainLogos'
import {
  AccountBottomColumnContainer as AccountAddressBalanceRow,
  AccountColumnContainer,
  AccountModalButton,
  AccountText,
  AccountWalletNetworkRow,
  FooterActionButtonsRow,
  Icon
} from './styled'

type PstlAccountModalProps = ModalPropsCtrlState['root'] &
  ModalPropsCtrlState['account'] &
  Pick<BaseModalProps, 'errorOptions'>

function AccountModalContent({ closeModalOnConnect, errorOptions }: PstlAccountModalProps) {
  const modalCallbacks = usePstlWeb3Modal()
  const userConnectionInfo = useUserConnectionInfo()
  const {
    disconnect: { disconnectAsync }
  } = useConnectDisconnect({
    connect: {
      onSuccess() {
        closeModalOnConnect && modalCallbacks.close()
      }
    },
    disconnect: {
      onSuccess() {
        modalCallbacks.close()
      }
    }
  })

  const { isUnsupportedChain, showNetworkButton } = useMemo(() => {
    const isUnsupportedChain =
      userConnectionInfo.chain?.unsupported ||
      !userConnectionInfo.supportedChains.some((chain) => chain.id === userConnectionInfo.chain?.id)
    const supportsSeveralChains = (userConnectionInfo?.supportedChains?.length || 0) > 1
    return {
      isUnsupportedChain,
      showNetworkButton: supportsSeveralChains || isUnsupportedChain
    }
  }, [userConnectionInfo.chain?.id, userConnectionInfo.chain?.unsupported, userConnectionInfo.supportedChains])

  const isSmallerScreen = useIsSmallMediaWidth()

  const { chain: chainLogo, wallet: walletLogo } = useConnectedChainAndWalletLogo()

  const [isCopied, onCopy] = useCopyClipboard(1500)
  const onExplorer = useCallback(() => {
    if (
      typeof globalThis?.window === 'undefined' ||
      !userConnectionInfo?.chain?.blockExplorers?.default ||
      !userConnectionInfo?.address
    )
      return

    const explorerUrl = userConnectionInfo.chain.blockExplorers.default.url + '/address/' + userConnectionInfo.address
    window.open(explorerUrl, '_blank')
  }, [userConnectionInfo?.chain?.blockExplorers?.default, userConnectionInfo?.address])

  const theme = useModalTheme()

  return (
    <AccountColumnContainer width="100%" gap="1rem">
      {/* Logos Row */}
      <WalletChainLogos
        wallet={{
          title: userConnectionInfo?.connector?.name || userConnectionInfo?.connector?.id || 'Unknown provider',
          logo: walletLogo
        }}
        chain={{
          title: userConnectionInfo?.chain?.name || userConnectionInfo?.chain?.id?.toString() || 'Unknown chain',
          logo: chainLogo
        }}
      />
      {/* Address and Balance Row */}
      <AccountAddressBalanceRow
        borderRadius="1rem"
        padding="1em"
        backgroundColor={theme?.connection?.button?.background?.background}
        border={theme?.account?.container?.walletAndNetwork?.border?.border}
      >
        <Column>
          <Row
            justifyContent="flex-start"
            gap="10px"
            style={{ cursor: 'pointer', zIndex: 1 }}
            title={userConnectionInfo.address}
            onClick={() => onCopy(userConnectionInfo?.address || '')}
          >
            <AccountText id="pstl-web3-modal-address-text" type="address">
              {userConnectionInfo.address
                ? isCopied
                  ? 'Copied!'
                  : truncateAddress(userConnectionInfo.address, { type: 'long' })
                : 'Disconnected'}
            </AccountText>
            {theme?.account?.icons?.copy && <Icon src={theme?.account?.icons?.copy?.url} />}
          </Row>
          <Row id={`${ModalId.ACCOUNT}__balance-text`}>
            <AccountText type="balance">Balance:</AccountText>
            <AccountText type="balance" title={userConnectionInfo.balance.data?.formatted || '0'} marginLeft={'5px'}>
              {Number(userConnectionInfo.balance.data?.formatted || 0).toLocaleString([], {
                maximumSignificantDigits: 4
              })}{' '}
              {userConnectionInfo.balance.data?.symbol || 'N/A'}
            </AccountText>
          </Row>
        </Column>
        <FooterActionButtonsRow
          marginTop={'1rem'}
          justifyContent={'space-evenly'}
          gap="2rem"
          style={{ zIndex: errorOptions?.show ? 0 : 1 }}
        >
          <AccountModalButton
            type="explorer"
            id={`${ModalId.ACCOUNT}__explorer-button`}
            connected={false}
            padding="0.6rem"
            onClick={() => onExplorer()}
          >
            {`${isSmallerScreen ? '' : 'View on '}Explorer`}
          </AccountModalButton>
        </FooterActionButtonsRow>
      </AccountAddressBalanceRow>
      {/* Wallet & Network Row */}
      <AccountWalletNetworkRow
        width="100%"
        padding="1em"
        border={theme?.account?.container?.addressAndBalance?.border?.border}
        borderRadius={theme?.account?.container?.addressAndBalance?.border?.radius}
        backgroundColor={
          isUnsupportedChain
            ? theme?.account?.container?.addressAndBalance?.background?.unsupported
            : theme?.connection?.button?.background?.background
        }
      >
        <Column width="100%" maxWidth={400}>
          {/* Wallet & Network Row */}
          <Row
            id={`${ModalId.ACCOUNT}__wallets-button`}
            fontSize="unset"
            height="auto"
            minHeight={82}
            width="100%"
            marginRight="1rem"
            onClick={() => modalCallbacks.open({ route: 'ConnectWallet' })}
          >
            <Column width={'100%'} gap="0.3rem">
              <AccountText
                id="pstl-web3-modal-wallet-text"
                type="main"
                display="inline-flex"
                alignItems="center"
                width="auto"
              >
                {theme?.account?.icons?.wallet?.url && <Icon src={theme?.account?.icons?.wallet?.url} />}
                Wallet:{' '}
                <AccountText
                  type="main"
                  fontSize="inherit"
                  fontWeight={700}
                  display={'inline-flex'}
                  alignItems="center"
                  padding={0}
                  marginLeft="0.5rem"
                >
                  {(userConnectionInfo.connector as ConnectorEnhanced<any, any>)?.customName ||
                    userConnectionInfo.connector?.name}
                </AccountText>
              </AccountText>
              <AccountText
                id="pstl-web3-modal-wallet-text"
                type="main"
                display="inline-flex"
                alignItems="center"
                width="auto"
              >
                {theme?.account?.icons?.network?.url && <Icon src={theme?.account?.icons?.network?.url} />}
                Network:{' '}
                <AccountText
                  type="main"
                  fontSize="inherit"
                  display={'inline-flex'}
                  alignItems="center"
                  padding={0}
                  marginLeft="0.5rem"
                >
                  {userConnectionInfo.chain?.name || userConnectionInfo.chain?.id || 'Unknown network'}
                  {isUnsupportedChain && <small className="unsupported-small-text">[unsupported]</small>}
                </AccountText>
              </AccountText>
            </Column>
          </Row>
          {/* Switch Network & Disconnect Buttons */}
          <Row id={`${ModalId.ACCOUNT}__network-disconnect-buttons`} width="100%" marginTop="1rem" gap="1rem">
            {showNetworkButton && (
              <AccountModalButton
                type="switchNetwork"
                id={`${ModalId.ACCOUNT}__network-button`}
                connected={false}
                padding="0.6rem"
                onClick={() => modalCallbacks.open({ route: 'SelectNetwork' })}
              >
                Switch Network
              </AccountModalButton>
            )}
            <AccountModalButton
              type="disconnect"
              id={`${ModalId.ACCOUNT}__disconnect-button`}
              connected={false}
              padding="0.6rem"
              onClick={() => disconnectAsync()}
            >
              Disconnect
            </AccountModalButton>
          </Row>
        </Column>
      </AccountWalletNetworkRow>
    </AccountColumnContainer>
  )
}

function useModalTheme(): PstlModalTheme['modals'] {
  const theme = useTheme()
  return theme.modals
}

export const AccountModal = memo(AccountModalContent)
