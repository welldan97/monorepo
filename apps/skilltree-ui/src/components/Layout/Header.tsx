import { Web3InfoContainer } from './common'
import { ExternalLink, Header as HeaderPstl, Pastellecon, Row } from '@past3lle/components'
import { upToSmall } from '@past3lle/theme'
import { InventoryButton } from 'components/Button'
import { ConnectionInfoButton } from 'components/Button/ConnectionInfoButton'
import { BlackBoldItalic, BlackHeader, CursiveHeader } from 'components/Text'
// import { UserConnectionStats } from 'components/UserWeb3ConnectionStats'
import { SHOP_URL } from 'constants/index'
import React from 'react'
import styled from 'styled-components/macro'
import { MAIN_BG } from 'theme/constants'

export const Skilltreecon = styled(Pastellecon)`
  filter: invert(1);
  margin-bottom: -25px;
  z-index: -1;
  transform: rotate(-11deg);
  position: absolute;
  top: -23px;
  left: -8px;
  width: 70%;
`

const LogoHeader = styled(BlackHeader)`
  position: relative;
  z-index: 1;
  color: ghostwhite;
  text-shadow: 4px 2px 3px #00000091;
  max-width: 27rem;
`

export const CheckoutForge = ({ className }: { className?: string }) => (
  <Row
    className={className}
    color={MAIN_BG}
    backgroundColor={'black'}
    padding={'0.75rem 1rem'}
    width="13.5rem"
    justifyContent={'center'}
  >
    <BlackBoldItalic fontSize={'1.5rem'} fontWeight={500} fontFamily="monospace">
      {/* @ts-ignore */}
      <ExternalLink $color={MAIN_BG} href={SHOP_URL} style={{ letterSpacing: '-1.6px' }}>
        view shop
      </ExternalLink>
    </BlackBoldItalic>
  </Row>
)

const HeaderContainer = styled(HeaderPstl)`
  min-height: 8rem;
  height: auto;
  padding: 1.5rem 2.5rem 0;

  > ${Row} {
    > ${LogoHeader} {
      > ${Skilltreecon} {
        width: 30%;
        opacity: 0.82;
      }
    }
    > ${Web3InfoContainer} {
      display: flex;
    }
  }

  ${upToSmall`
    min-height: 6rem;
    padding: 0;

  > ${Row} > ${LogoHeader} {
    width: 100%;
    padding: 0.5rem;
    margin-left: 4rem;

    > ${Skilltreecon} {
      width: 14%;
      left: -3rem;
      top: 0;
      opacity: 1;
    }
    > ${Row} {
      display: inline-flex;
      width: 100%;
      margin-left: 0rem;

      ${CursiveHeader} {
        width: auto;
        font-size: 5rem;
      }
      > div:last-child {
        z-index: -1;
        width: auto;
      }
    }
  }

    > ${Row} > ${Web3InfoContainer} {
      display: none;
    }
  `}
`

export const Header = () => {
  return (
    <HeaderContainer>
      <Row gap="1rem" height="100%" width="100%" justifyContent={'space-between'}>
        <LogoHeader>
          <Skilltreecon />
          <Row alignItems={'center'} width="100%" gap="0 1rem">
            <CursiveHeader fontSize="5rem">FORGE</CursiveHeader>
            <CheckoutForge />
          </Row>
        </LogoHeader>
        <Web3InfoContainer>
          <Row margin="0.5rem" width="auto" height="52px" gap="1rem">
            <InventoryButton restWordProps={{ fontSize: '1.8rem' }} />
            <ConnectionInfoButton />
            {/* <UserConnectionStats containerProps={{ height: '100%' }} /> */}
          </Row>
        </Web3InfoContainer>
      </Row>
    </HeaderContainer>
  )
}

/* 
${({ isOpen, theme }) => upToSmall`
    overflow: hidden;
    
    > ${ThemedButton} {
      display: none;
    }

    > #Web3InfoContainer-menu {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0; bottom: 0; left: 0; right: 0;
      background-color: ${theme.rarity.legendary.backgroundColor};
      font-family: 'Goth', monospace;
      font-size: 3rem;
      z-index: 500;
      border-radius: 5px;
      padding: 0.5rem;
    }
    
    // transition: width, height 0.4s ease-in-out;
    
    ${
      isOpen &&
      `
      background-color: ${theme.blackOpaque1};
      position: fixed;
      top: 8rem;
      right: 0;
      width: 300px;
      height: 200px;
      padding: 4rem;

      flex-flow: column nowrap;
      justify-content: space-evenly;
      align-items: center;

      > ${ThemedButton} {
        display: flex;
        color: black;
      }

      > #Web3InfoContainer-close-button {
        display: flex;
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        color: ghostwhite;
        font-size: 2rem;
      }
      > #Web3InfoContainer-menu {
        display: none;
        font-size: 2rem;
      }
    `
    }
  `}
*/
