import {CancelInvestment, Claim, Invest} from '../generated/templates/CfManagerSoftcapVesting/CfManagerSoftcapVesting'
import {Transaction} from '../generated/schema'
import {Address, BigInt, dataSource} from '@graphprotocol/graph-ts'

export function handleInvest(event: Invest): void {
  const eventId = event.transaction.hash.toHexString() + '-' + event.logIndex.toString()
  let transaction = new Transaction(eventId)
  let context = dataSource.context()

  transaction.fromAddress = event.params.investor
  transaction.toAddress = event.address // TODO is this correct?
  transaction.contract = event.address // TODO correct?
  transaction.issuer = Address.fromString(context.getString('issuerAddress'))
  transaction.hash = event.transaction.hash
  transaction.type = 'ReserveInvestment'
  transaction.asset = event.params.asset
  transaction.timestamp = event.params.timestamp
  transaction.tokenSymbol = context.getString('tokenSymbol')
  transaction.tokenValue = event.params.tokenValue
  transaction.tokenAmount = event.params.tokenAmount
  transaction.payoutId = BigInt.zero() // TODO
  transaction.revenue = BigInt.zero() // TODO

  transaction.save()
}

export function handleClaim(event: Claim): void {
  const eventId = event.transaction.hash.toHexString() + '-' + event.logIndex.toString()
  let transaction = new Transaction(eventId)
  let context = dataSource.context()

  transaction.fromAddress = event.address // TODO is this correct?
  transaction.toAddress = event.params.investor // TODO correct?
  transaction.contract = event.address // TODO correct?
  transaction.issuer = Address.fromString(context.getString('issuerAddress'))
  transaction.hash = event.transaction.hash
  transaction.type = 'CompletedInvestment' // TODO correct?
  transaction.asset = event.params.asset
  transaction.timestamp = event.params.timestamp
  transaction.tokenSymbol = context.getString('tokenSymbol')
  transaction.tokenValue = BigInt.zero() // event.params.tokenValue
  transaction.tokenAmount = event.params.tokenAmount
  transaction.payoutId = BigInt.zero() // TODO
  transaction.revenue = BigInt.zero() // TODO

  transaction.save()
}

export function handleCancelInvestment(event: CancelInvestment): void {
  const eventId = event.transaction.hash.toHexString() + '-' + event.logIndex.toString()
  let transaction = new Transaction(eventId)
  let context = dataSource.context()

  transaction.fromAddress = event.address // TODO is this correct?
  transaction.toAddress = event.params.investor // TODO correct?
  transaction.contract = event.address // TODO correct?
  transaction.issuer = Address.fromString(context.getString('issuerAddress'))
  transaction.hash = event.transaction.hash
  transaction.type = 'CancelInvestment'
  transaction.asset = event.params.asset
  transaction.timestamp = event.params.timestamp
  transaction.tokenSymbol = context.getString('tokenSymbol')
  transaction.tokenValue = event.params.tokenValue
  transaction.tokenAmount = event.params.tokenAmount
  transaction.payoutId = BigInt.zero() // TODO
  transaction.revenue = BigInt.zero() // TODO

  transaction.save()
}
