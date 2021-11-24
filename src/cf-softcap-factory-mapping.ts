import {CfManagerSoftcapCreated} from '../generated/CfManagerSoftcapFactory/CfManagerSoftcapFactory'
import {CfManagerSoftcap} from '../generated/templates'
import {IAssetCommon} from '../generated/templates/CfManagerSoftcap/IAssetCommon'
import {DataSourceContext} from '@graphprotocol/graph-ts'

export function handleCfManagerSoftcapCreated(event: CfManagerSoftcapCreated): void {
  const assetCommonState = IAssetCommon.bind(event.params.asset).commonState()

  let context = new DataSourceContext()
  context.setString('issuerAddress', assetCommonState.issuer.toHexString())
  context.setString('tokenSymbol', assetCommonState.symbol)

  CfManagerSoftcap.createWithContext(event.params.cfManager, context)
}
