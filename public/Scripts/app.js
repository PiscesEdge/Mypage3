//IIFE immedietely invoked funciton expression
(function(){

    function Start()
    {
        console.log("App Started...");

        //To target all buttons that have a class of btn-danger (red buttons)
        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(Button of deleteButtons)
        {
            Button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDdefault(); 
                    window.location.assign('/contact-list')
                }
            });
        }
    }

    window.addEventListener("load", Start);
})();