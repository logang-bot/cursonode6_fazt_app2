$('#btn-like').click(function(e){
    e.preventDefault()
    let imgid = $(this).data('id')
    
    $.post('/images/'+imgid+'/like')
    .done(data=>{
        console.log(data)
        $('.likes-count').text(data.likes)
    })
})