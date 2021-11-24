import {CfManagerSoftcapCreated} from '../generated/CfManagerSoftcapFactory/CfManagerSoftcapFactory'
import {CfManagerSoftcap} from '../generated/templates'
import {IAssetCommon} from '../generated/templates/CfManagerSoftcap/IAssetCommon'
import {DataSourceContext} from '@graphprotocol/graph-ts'

export function handleCfManagerSoftcapCreated(event: CfManagerSoftcapCreated): void {
  const issuerAddress = IAssetCommon.bind(event.params.asset).commonState().issuer
  let context = new DataSourceContext()
  context.setString('issuerAddress', issuerAddress.toHexString())
  CfManagerSoftcap.createWithContext(event.params.cfManager, context)
}
