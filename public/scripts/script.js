//Ensure the page is loaded before loading the code
$(function(){
    //Avoid form to be submitted on enter press but not textareas to be nerfed
    $(document).on("keypress", ":input:not(textarea)", function(event){
        return event.keyCode != 13;
    });
});
