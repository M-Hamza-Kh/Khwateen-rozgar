import React, {useEffect} from 'react';
import ScriptsTags from "./scriptsTags";
import CryptoJS from "crypto-js";
import $ from "jquery";

const JazzCash = (props) => {
    const {payClick, data, onClose} = props;
    let date = Date
    useEffect(() => {
        console.log("jazzCash", payClick)
        console.log("jazzCash", data)
        if (payClick) {
            $("#pay").trigger("click");
            onClose()
        }
    })

    date.prototype.YYYYMMDDHHMMSS = function () {
        var yyyy = this.getFullYear().toString();
        var MM = pad(this.getMonth() + 1, 2);
        var dd = pad(this.getDate(), 2);
        var hh = pad(this.getHours(), 2);
        var mm = pad(this.getMinutes(), 2)
        var ss = pad(this.getSeconds(), 2)

        return yyyy + MM + dd + hh + mm + ss;
    };

    const getDate = () => {
        let d = new Date();
        return d.YYYYMMDDHHMMSS();
    }

    const getDateExp = () => {
        let d = new Date(new Date().getTime() + 50 * 10000);
        return d.YYYYMMDDHHMMSS();
    }

    function pad(number, length) {

        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }

        return str;

    }

    function CalculateHash(IntegritySalt) {
        var hashString = '';

        hashString += IntegritySalt + '&';

        if (document.getElementsByName("pp_Amount")[0].value !== '') {
            hashString += document.getElementsByName("pp_Amount")[0].value + '&';
        }
        //if (document.getElementsByName("pp_BankID")[0].value !== '') {
        //    hashString += document.getElementsByName("pp_BankID")[0].value + '&';
        //}

        if (document.getElementsByName("pp_BillReference")[0].value !== '') {
            hashString += document.getElementsByName("pp_BillReference")[0].value + '&';
        }
        // if (document.getElementsByName("pp_CustomerEmail")[0].value !== '') {
        //     hashString += document.getElementsByName("pp_CustomerEmail")[0].value + '&';
        // }
        // if (document.getElementsByName("pp_CustomerID")[0].value !== '') {
        //     hashString += document.getElementsByName("pp_CustomerID")[0].value + '&';
        // }
        // if (document.getElementsByName("pp_CustomerMobile")[0].value !== '') {
        //     hashString += document.getElementsByName("pp_CustomerMobile")[0].value + '&';
        // }
        if (document.getElementsByName("pp_Description")[0].value !== '') {
            hashString += document.getElementsByName("pp_Description")[0].value + '&';
        }
        // if (document.getElementsByName("pp_IsRegisteredCustomer")[0].value !== '') {
        //     hashString += document.getElementsByName("pp_IsRegisteredCustomer")[0].value + '&';
        // }
        if (document.getElementsByName("pp_Language")[0].value !== '') {
            hashString += document.getElementsByName("pp_Language")[0].value + '&';
        }
        if (document.getElementsByName("pp_MerchantID")[0].value !== '') {
            hashString += document.getElementsByName("pp_MerchantID")[0].value + '&';
        }
        if (document.getElementsByName("pp_Password")[0].value !== '') {
            hashString += document.getElementsByName("pp_Password")[0].value + '&';
        }
        if (document.getElementsByName("pp_ReturnURL")[0].value !== '') {
            hashString += document.getElementsByName("pp_ReturnURL")[0].value + '&';
        }
        if (document.getElementsByName("pp_SubMerchantID")[0].value !== '') {
            hashString += document.getElementsByName("pp_SubMerchantID")[0].value + '&';
        }
        // if (document.getElementsByName("pp_TokenizedCardNumber")[0].value !== '') {
        //     hashString += document.getElementsByName("pp_TokenizedCardNumber")[0].value + '&';
        // }
        if (document.getElementsByName("pp_TxnCurrency")[0].value !== '') {
            hashString += document.getElementsByName("pp_TxnCurrency")[0].value + '&';
        }
        if (document.getElementsByName("pp_TxnDateTime")[0].value !== '') {
            hashString += document.getElementsByName("pp_TxnDateTime")[0].value + '&';
        }
        if (document.getElementsByName("pp_TxnExpiryDateTime")[0].value !== '') {
            hashString += document.getElementsByName("pp_TxnExpiryDateTime")[0].value + '&';
        }
        if (document.getElementsByName("pp_TxnRefNo")[0].value !== '') {
            hashString += document.getElementsByName("pp_TxnRefNo")[0].value + '&';
        }

        if (document.getElementsByName("pp_TxnType")[0].value !== '') {
            hashString += document.getElementsByName("pp_TxnType")[0].value + '&';
        }

        if (document.getElementsByName("pp_Version")[0].value !== '') {
            hashString += document.getElementsByName("pp_Version")[0].value + '&';
        }
        if (document.getElementsByName("ppmpf_1")[0].value !== '') {
            hashString += document.getElementsByName("ppmpf_1")[0].value + '&';
        }
        if (document.getElementsByName("ppmpf_2")[0].value !== '') {
            hashString += document.getElementsByName("ppmpf_2")[0].value + '&';
        }
        if (document.getElementsByName("ppmpf_3")[0].value !== '') {
            hashString += document.getElementsByName("ppmpf_3")[0].value + '&';
        }
        if (document.getElementsByName("ppmpf_4")[0].value !== '') {
            hashString += document.getElementsByName("ppmpf_4")[0].value + '&';
        }
        if (document.getElementsByName("ppmpf_5")[0].value !== '') {
            hashString += document.getElementsByName("ppmpf_5")[0].value + '&';
        }

        hashString = hashString.slice(0, -1);
        document.getElementById("hashValuesString").value = hashString;
        console.log('hashString', hashString)
    }

    function submitForm() {
      //var IntegritySalt = "2fsz3tv4wg"
        var IntegritySalt = "c9a3y122wu"
        document.getElementsByName("pp_Amount")[0].value = data.amount;
        document.getElementsByName("pp_CustomerID")[0].value = data.customerID;
        //document.getElementsByName("pp_BankID")[0].value = 'TBANK'
       // document.getElementsByName("pp_CustomerEmail")[0].value = data.customerEmail;
        document.getElementsByName("pp_Description")[0].value = data.description;
         document.getElementsByName("pp_BillReference")[0].value = data.package === 1 ? "billRef" : "billRef";
         //document.getElementsByName("pp_BillReference")[0].value = data.package;
         document.getElementsByName("ppmpf_1")[0].value = data.id;
        //document.getElementsByName("ppmpf_2")[0].value = data.sponsor;
      
        // document.getElementsByName("pp_TxnRefNo")[0].value = 'T'+`${getDate()}${pad(new Date().getMilliseconds(), 3)}`;
        document.getElementsByName("pp_TxnRefNo")[0].value = 'T' + getDate();
        document.getElementsByName("pp_TxnDateTime")[0].value = getDate();
        document.getElementsByName("pp_TxnExpiryDateTime")[0].value = getDateExp();
        CalculateHash(IntegritySalt);
        var hash = CryptoJS.HmacSHA256(document.getElementById("hashValuesString").value, IntegritySalt);
        document.getElementsByName("pp_SecureHash")[0].value = hash + '';


        document.jsform.submit();
    }

    return (
        <div>
            <ScriptsTags/>
            <form name="jsform" method="post"
                action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform">
                <input type="hidden" name="pp_Version" id="pp_Version" value="2.0"/>
                 <input type="hidden" name="pp_IsRegisteredCustomer" id="pp_IsRegisteredCustomer" value="Yes"/> 
                <input type="hidden" name="pp_TxnType" value="MWALLET"/>
                <input type="hidden" name="pp_TokenizedCardNumber" value=""/>
                <input type="hidden" name="pp_CustomerID" value=""/>
                <input type="hidden" name="pp_CustomerEmail" value=""/>
                <input type="hidden" name="pp_CustomerMobile" value=""/>
                {/* <input type="hidden" name="pp_MerchantID" value="MC15535"/> */}
                <input type="hidden" name="pp_MerchantID" value="00232554"/>
                <input type="hidden" name="pp_Language" value="EN"/>
                <input type="hidden" name="pp_SubMerchantID" value=""/>
                <input type="hidden" name="pp_BankID" value=""/>
                <input type="hidden" name="pp_Password" value="32vbe2dezy"/>
                <input type="hidden" name="pp_TxnRefNo" id="T20220714211857"
                       value=""/>
                <input type="hidden" name="pp_Amount" value="1000"/>
                <input type="hidden" name="pp_DiscountedAmount"
                       value=""/>
                <input type="hidden" name="pp_DiscountBank"
                       value=""/>
                <input type="hidden" name="pp_TxnCurrency"
                       value="PKR"/>
                <input type="hidden"
                       name="pp_TxnDateTime"
                       id="pp_TxnDateTime"
                    value="20221206013255"/>
                <input type="hidden"
                       name="pp_TxnExpiryDateTime"
                       id="pp_TxnExpiryDateTime"
                    value="20221206213540"/>
                <input type="hidden"
                       name="pp_BillReference"
                    value="billRef"/>
                <input type="hidden"
                       name="pp_Description"
                       value="Description of transaction"/>
                <input type="hidden" name="pp_ReturnURL"
                   value="https://khawateenrozgar.com/webapi/api/payment/pay"/>
                <input type="hidden"
                       name="pp_SecureHash"
                       value=""/>
                <input
                    type="hidden"
                    name="ppmpf_1"
                    value="1"/>
                <input
                    type="hidden"
                    name="ppmpf_2"
                    value="2"/>
                <input
                    type="hidden"
                    name="ppmpf_3"
                    value="3"/>
                <input
                    type="hidden"
                    name="ppmpf_4"
                    value="4"/>
                <input
                    type="hidden"
                    name="ppmpf_5"
                    value="5"/>
                <input type="hidden" id="hashValuesString" value=""/>
                <button
                    type="button"
                    id="pay"
                    hidden={true}
                    onClick={submitForm}>Pay
                </button>
            </form>
        </div>
    );
};

export default JazzCash;