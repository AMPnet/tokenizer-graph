import {CfManagerSoftcapVestingCreated} from '../generated/CfManagerSoftcapVestingFactory/CfManagerSoftcapVestingFactory'
import {CfManagerSoftcapVesting} from '../generated/templates'
import {IAssetCommon} from '../generated/CfManagerSoftcapVestingFactory/IAssetCommon'
import {DataSourceContext} from '@graphprotocol/graph-ts'

export function handleCfManagerSoftcapVestingCreated(event: CfManagerSoftcapVestingCreated): void {
  const assetCommonState = IAssetCommon.bind(event.params.asset).commonState()

  let context = new DataSourceContext()
  context.setString('issuerAddress', assetCommonState.issuer.toHexString())
  context.setString('tokenSymbol', assetCommonState.symbol)

  CfManagerSoftcapVesting.createWithContext(event.params.cfManager, context)
}
