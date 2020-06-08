let walletApi = require('./walletapi');
let constants = require('../common/constants');
let DeviceManger = require('./devicemanagerapi');
const electron = require('electron');
const filePath = (electron.app || electron.remote.app).getPath('userData') + "/";

export function api(apiName, json) {
    let result;
    let connectRes = DeviceManger.connect("imKey Pro");
    if (connectRes != constants.RESULT_STATUS_SUCCESS) {
        result = {
            error: connectRes,
        };
        return result;
    } else {
        //检查是否绑定
        let bindCheckRes = DeviceManger.deviceBindCheck(filePath);
        if (bindCheckRes != "bound_this") {
            result = {
                error: bindCheckRes,
            };
            return result;
        }
    }

    if (apiName == null || apiName == "" || apiName.isUndefined) {
        result = {
            error: "input api function is null",
        };
        return result;
    }
        // else if(apiName =="getSeid"){return DeviceManger.getSeid()}
        // else if(apiName =="getSn"){ return DeviceManger.getSn()}
        // else if(apiName =="getRamSize"){ return DeviceManger.getRamSize()}
        // else if(apiName =="getFirmwareVersion"){ return DeviceManger.getFirmwareVersion()}
        // else if(apiName =="getBatteryPower"){ return DeviceManger.getBatteryPower()}
        // else if(apiName =="getLifeTime"){ return DeviceManger.getLifeTime()}
        // else if(apiName =="getBleName"){ return DeviceManger.getBleName()}
        // else if(apiName =="setBleName"){ return DeviceManger.setBleName()}
        // else if(apiName =="getBleVersion"){ return DeviceManger.getBleVersion()}
        // else if(apiName =="activeDevice"){ return DeviceManger.activeDevice()}
        // else if(apiName =="checkDevice"){ return DeviceManger.checkDevice()}
        // else if(apiName =="checkUpdate"){ return DeviceManger.checkUpdate()}
        // else if(apiName =="downloadApplet"){ return DeviceManger.downloadApplet()}
        // else if(apiName =="updateApplet"){ return DeviceManger.updateApplet()}
        // else if(apiName =="deleteApplet"){ return DeviceManger.deleteApplet()}
    // else if(apiName =="deviceBindCheck"){return DeviceManger.deviceBindCheck()}
    else if (apiName == "transactionBTC") {
        let response = walletApi.BitcoinTransaction_BTC(json)
        if (response.getTxHash() == "" || response.getTxHash() == null || response.getTxHash().isUndefined) {
            result = {
                error: response,
            };
        } else {
            result = {
                txHash: response.getTxHash(),
                txData: response.getTxData(),
            };
        }
        return result;
    } else if (apiName == "transactionBTCSEGWIT") {
        let response = walletApi.BitcoinTransaction_BTC_SEGWIT(json)
        if (response.getTxHash() == "" || response.getTxHash() == null || response.getTxHash().isUndefined) {
            result = {
                error: response,
            };
        } else {
            result = {
                txHash: response.getTxHash(),
                witnessTxData: response.getWitnessTxData(),
                wtxHash: response.getWtxHash()
            };
        }
        return result;
    } else if (apiName == "transactionBTCUSDT") {
        let response = walletApi.BitcoinTransaction_BTC_USDT(json)
        if (response.getTxHash() == "" || response.getTxHash() == null || response.getTxHash().isUndefined) {
            result = {
                error: response,
            };
        } else {
            result = {
                txHash: response.getTxHash(),
                txData: response.getTxData(),
            };
        }
        return result;
    } else if (apiName == "transactionBTCUSDTSEGWIT") {
        let response = walletApi.BitcoinTransaction_BTC_USDT_SEGWIT(json)
        if (response.getTxHash() == "" || response.getTxHash() == null || response.getTxHash().isUndefined) {
            result = {
                error: response,
            };
        } else {
            result = {
                txHash: response.getTxHash(),
                witnessTxData: response.getWitnessTxData(),
                wtxHash: response.getWtxHash()
            };
        }
        return result;
    } else if (apiName == "transactionETHSIGNTX") {
        let response = walletApi.ETHTransaction_sign_TX(json)
        if (response.getTxHash() == "" || response.getTxHash() == null || response.getTxHash().isUndefined) {
            result = {
                error: response,
            };
        } else {
            result = {
                txHash: response.getTxHash(),
                txData: response.getTxData(),
            };
        }
        return result;
    } else if (apiName == "transactionETHSIGNMSG") {
        let response = walletApi.ETHTransaction_sign_MSG(json)
        if (response.getSignature() == "" || response.getSignature() == null || response.getSignature().isUndefined) {
            result = {
                error: response,
            };
        } else {
            result = {
                signature: response.getSignature(),
            };
        }
        return result;
    } else if (apiName == "transactionEOSSIGNTX") {
        let response = walletApi.EOSTransaction_sign_TX(json)
        if (response.getHash() == "" || response.getHash() == null || response.getHash().isUndefined) {
            result = {
                error: response,
            };
            return result;
        } else {
            let list = [];
            for (let i = 0; i < response.length; i++) {
                let tx_hash = response[i].getHash();
                let signs = response[i].getSignsList();
                result = {
                    tx_hash: tx_hash,
                    signs: signs
                };
                list.push(result);
            }
            return list;
        }
    } else if (apiName == "transactionEOSSIGNMSG") {
        let response = walletApi.EOSTransaction_sign_MSG(json)
        if (response.getSignature() == "" || response.getSignature() == null || response.getSignature().isUndefined) {
            result = {
                error: response,
            };
        } else {
            result = {
                signature: response.getSignature(),
            };
        }
        return result;
    } else if (apiName == "transactionCOSMOSSIGNTX") {
        let response = walletApi.COSMOSTransaction_sign_TX(json)
        if (response.getTxHash() == "" || response.getTxHash() == null || response.getTxHash().isUndefined) {
            result = {
                error: response,
            };
        } else {
            result = {
                txHash: response.getTxHash(),
                signature: response.getTxData(),
            };
        }

        return result;
    } else {
        return "not found api function！ "
    }
}

// module.exports = {
//     api
// }