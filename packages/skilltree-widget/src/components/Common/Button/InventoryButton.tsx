import { ButtonProps } from '@past3lle/components'
import { MEDIA_WIDTHS } from '@past3lle/theme'
import React from 'react'

import { ThemedButton } from '.'
import TREASURE_CHEST_GREEN from '../../../assets/png/icons/icons8-treasure-chest-90-green.png'
import {
  /* useSidePanelAtom, */
  useSidePanelAtomBase
} from '../../../state/SidePanel'
import { useGetWindowSize } from '../../../state/WindowSize'
import { MAIN_BG } from '../../../theme/constants'
import { TEXTURE_BG_URL_MAP } from '../../../theme/global'
import { CursiveMonoHeader, CursiveMonoHeaderProps } from '../Text'

interface InventoryButtonProps {
  buttonProps?: ButtonProps
  capitalLetterProps?: CursiveMonoHeaderProps['capitalLetterProps']
  restWordProps?: CursiveMonoHeaderProps['restWordProps']
}
export function InventoryButton(props: InventoryButtonProps) {
  const [, openActivePanel] = useSidePanelAtomBase()
  const [{ width = 0 }] = useGetWindowSize()
  const showShortLogo = width > MEDIA_WIDTHS.upToSmall && width < MEDIA_WIDTHS.upToMedium
  return (
    <ThemedButton
      bgColor={'black'}
      bgImage={TEXTURE_BG_URL_MAP}
      bgBlendMode="hard-light"
      title={'Click to view skills inventory and account information'}
      display="flex"
      alignItems="center"
      gap="0 0.5rem"
      height="80%"
      {...props.buttonProps}
      onClick={() => openActivePanel((state) => ({ ...state, type: ['USER_STATS', ...state.type] }))}
    >
      <CursiveMonoHeader
        text={showShortLogo ? 'I' : 'Inventory'}
        capitalLetterProps={{
          display: 'inline-flex',
          alignItems: 'center',
          color: MAIN_BG,
          fontSize: '4rem',
          zIndex: 3,
          ...props.capitalLetterProps
        }}
        restWordProps={{
          zIndex: -1,
          marginLeft: '-0.2rem',
          color: '#ebebe9e3',
          fontFamily: 'monospace',
          fontSize: '1.8rem',
          letterSpacing: '-1.4px',
          fontStyle: 'normal',
          fontWeight: 300,
          ...props.restWordProps
        }}
      />
      <img src={TREASURE_CHEST_GREEN} style={{ maxWidth: '2.3rem' }} />
    </ThemedButton>
  )
}
