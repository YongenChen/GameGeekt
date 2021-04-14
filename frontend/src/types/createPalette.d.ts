/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        tertiary: PaletteColor;
      }

    interface PaletteOptions {
        tertiary: PaletteColorOptions;
    }
}
