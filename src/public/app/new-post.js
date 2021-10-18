inputTitle = $('#inputTitle')
inputBody = $('#inputBody')
btnSubmit = $('#btnSubmit')

inputTitle.on('input',toggleSubmitButton)
inputBody.on('input',toggleSubmitButton)

function toggleSubmitButton(){
    console.log('here')
    btnSubmit.prop('disabled',((inputTitle.val()=='') || (inputBody.val()=='')))
}

btnSubmit.click(()=>{
    btnSubmit.prop('disabled',true)
    
    $.post('api/posts',{
        title:inputTitle.val(),
        body:inputBody.val(),
        userId:window.currentUser.id
    },function(err,data){
        $('#content').load('../components/success-alert.html')
    })
})

