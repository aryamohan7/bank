class Bank {
    //FOR USERREGISTER
    validateRegister(account_number) {
        return account_number in localStorage ? true : false
    }

    addToAccountData() {
        console.log("here");
        let account_number = acc_no.value;
        let email_address = email_.value;
        let phone_number = ph_no.value;
        let balance="1500"
        let password = user_password.value;

        let register = {
            account_number, email_address, phone_number, password,balance
        }
        // console.log(register);
        if (this.validateRegister(account_number)) {
            swal("Already exist!", "failed", "error");
        }
        else {
            localStorage.setItem(account_number, JSON.stringify(register))
            swal("created!", "Book add!", "success");
        }

    }
    authenticate(acno,password)
    {
        if(this.validateRegister(acno))
        {
            let user = JSON.parse(localStorage.getItem(acno))
            if(user.password==password)
            {
                return 1
            }
            else{
                return 0
            }
        }
        else
        {
            return -1
        }
    }
    login(){
        let user_accno = user_acno.value;
        let user_pwd =user_password.value

        let user = this.authenticate(user_accno,user_pwd)
        if(user===1)
        {
            sessionStorage.setItem("user",user_accno)
            alert("access granted")
            window.location.href="./home_page.html"
        }
        else
        {
            alert("access denied")
        }
    }

    //HOME PAGE
    logout(){
        if("user" in sessionStorage)
        {
            alert("Logout")
            sessionStorage.removeItem("user")
            window.location.href="./login.html"

        }
    }
    getUser(){
        let user = sessionStorage.getItem("user")
        let element = document.createElement("div")
        element.innerHTML=`<h1>welcome user ${user}</h1> <br>`
        document.querySelector("body").append(element)
    }

    getUserDataFromLocalstorage(acc_no)
    {
        return JSON.parse(localStorage.getItem(acc_no))        
    }

    balanceEnquiry(){
        let logged_user = sessionStorage.getItem("user")
        let logged_user_data = this.getUserDataFromLocalstorage(logged_user)
        let bal=logged_user_data.balance;
        console.log(bal);
        return bal
        
    }
    fundTransfer(){
        let pay_accno = sessionStorage.getItem("user")
        let to_accno = user_acno.value
        let confirm_accno = user_ca.value
        let price = Number(user_amt.value)

        if(to_accno == confirm_accno)
        {
            if(this.validateRegister(to_accno)){
                let aval_bal = this.balanceEnquiry()
                if(price>aval_bal){
                    alert("insufficient balance")
                }
                else
                {
                    let payee = this.getUserDataFromLocalstorage(pay_accno)
                    let to_account = this.getUserDataFromLocalstorage(to_accno)
                    let bal_ = aval_bal-price
                    payee.balance=bal_

                    localStorage.setItem(pay_accno,JSON.stringify(payee))
                    let to_cur_bal = Number(to_account.balance)
                    to_cur_bal+=price
                    to_account.balance=to_cur_bal
                    localStorage.setItem(to_accno,JSON.stringify(to_account))
                }
            }
            else{
                alert("invalid account number")
            }
        }
    }
}
var bank = new Bank()