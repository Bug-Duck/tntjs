/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * tntjs plugin devlop.
 */

export class TNTPlugin {
  /** TNT plugin's name */
  name: string;
  /** TNT plugin's version */
  version: string;

  onload() {}
  render() {}
  watchEffect() {}
  addFunction(): Record<string, (() => any)> {
    return {};
  }
}
