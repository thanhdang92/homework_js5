Validator = function (option) { 
    var formElement = document.querySelector(option.selector)
    
    if (formElement) { 
        
        formElement.onsubmit = function (e) {
            e.preventDefault();
           
            option.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule);
            });
            
            var id = formElement.querySelector('#id').value;
            var name = formElement.querySelector('#name').value;
            var birthday = formElement.querySelector('#birthday').value;
            var phoneNumber = formElement.querySelector('#phoneNumber').value;
            console.log(birthday.length)
            formElement.reset();
            if (id.length != 0 && birthday.length != 0 && name.length != 0 && phoneNumber.length != 0) {
                localStorage.setItem('id', id);
                localStorage.setItem('name', name);
                localStorage.setItem('birthday', birthday);
                localStorage.setItem('phoneNumber', phoneNumber);
            
            
                
                var id2 = localStorage.getItem('id');
                var name2 = localStorage.getItem('name');
                var birthday2 = localStorage.getItem('birthday');
                var phoneNumber2 = localStorage.getItem('phoneNumber');
                const user = { 
                    id: id2,
                    name: name2,
                    birthday: birthday2,
                    phoneNumber: phoneNumber2
                }
                
                 const tbody = document.querySelector('#studentTable tbody');
    
                    // Tạo một dòng mới
                    const row = document.createElement('tr');
        
                    // Tạo các ô chứa dữ liệu và thêm chúng vào trong dòng
                    const idCell = document.createElement('td');
                    idCell.textContent = user.id;
                    row.appendChild(idCell);
        
                    const nameCell = document.createElement('td');
                    nameCell.textContent = user.name;
                    row.appendChild(nameCell);
        
                    const birthdayCell = document.createElement('td');
                    birthdayCell.textContent = user.birthday;
                    row.appendChild(birthdayCell);
        
                    const phoneNumberCell = document.createElement('td');
                    phoneNumberCell.textContent = user.phoneNumber;
                    row.appendChild(phoneNumberCell);
        
                    // Thêm dòng mới vào trong tbody
                    tbody.appendChild(row);
            }

           
            

            
          
        }
        const validate = function (inputElement, rule) { 
            var errorMessageElement = inputElement.parentElement.querySelector(option.error);
            var errorMess = rule.test(inputElement.value);
            if (errorMess) {
                errorMessageElement.innerText = errorMess;
            }
            else {
                errorMessageElement.innerText = '';
            }
        }
        option.rules.forEach(function (rule)  { 
            
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    var errorMessageElement = inputElement.parentElement.querySelector(option.error);
                    if (inputElement.value) { 
                        errorMessageElement.innerText = '';
                    }
                }
            }
 
        })
    }
    
    
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) { 
            return value.trim() ? undefined : 'Vui lòng nhập dữ liệu!';
        }
    }
 }

Validator.isName = function (selector) { 
    return {
        selector: selector,
        test: function (value) { 
            return value.length >= 5 ? undefined : 'Tên phải có ít nhất 5 ký tự'
        }
    }
}

Validator.isBirthday = function (selector) { 
    return {
        selector: selector,
        test: function (value) { 
            var dobDate = new Date(value);
            var today = new Date();
            var age = today.getFullYear() - dobDate.getFullYear();
            return age > 18 ? undefined : 'Bạn chưa đủ 18 tuổi'
        }
    }
}


Validator.isPhoneNumber = function (selector) { 
    return {
        selector: selector,
        test: function (value) { 
            return value.length >= 10 ? undefined : 'Số điện thoại phải có ít nhất 10 ký tự.';
        }
    }
}