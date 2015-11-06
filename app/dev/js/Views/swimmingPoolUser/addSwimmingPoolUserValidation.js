define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    addSwimmingPoolValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                return regexp.test(value);
            }, "Por Favor Ingrese un valor con el formato correcto.");
            
            $.validator.messages.required = "Campo requerido";

            function revisarDigito(dvr){
                dv = dvr + ""   
                if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K') 
                {        
                    return false;   
                }   
                return true;

            }

            function revisarDigito2(crut){

                largo = crut.length;    
                if ( largo < 2 )    
                {     
                    return false;   
                }   
                if ( largo > 2 )        
                    rut = crut.substring(0, largo - 1); 
                else        
                    rut = crut.charAt(0);   
                dv = crut.charAt(largo-1);  
                revisarDigito( dv );    

                if ( rut == null || dv == null )
                    return 0    

                var dvr = '0'   
                suma = 0    
                mul  = 2    

                for (i= rut.length -1 ; i >= 0; i--)    
                {   
                    suma = suma + rut.charAt(i) * mul       
                    if (mul == 7)           
                        mul = 2     
                    else                
                        mul++   
                }   
                res = suma % 11 
                if (res==1)     
                    dvr = 'k'   
                else if (res==0)        
                    dvr = '0'   
                else    
                {       
                    dvi = 11-res        
                    dvr = dvi + ""  
                }
                if ( dvr != dv.toLowerCase() )  
                {           
                    return false    
                }
                return true
            }

            $.validator.addMethod("validRut", function() {
                var texto = $("#rut").val()
                var tmpstr = "";    
                for ( i=0; i < texto.length ; i++ )     
                    if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
                        tmpstr = tmpstr + texto.charAt(i);  
                texto = tmpstr; 
                largo = texto.length;   

                if ( largo < 2 )    
                {           
                    return false;   
                }   

                for (i=0; i < largo ; i++ ) 
                {           
                    if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
                    {         
                        return false;       
                    }   
                }   

                var invertido = ""; 
                for ( i=(largo-1),j=0; i>=0; i--,j++ )      
                    invertido = invertido + texto.charAt(i);    
                var dtexto = "";    
                dtexto = dtexto + invertido.charAt(0);  
                dtexto = dtexto + '-';  
                cnt = 0;    

                for ( i=1,j=2; i<largo; i++,j++ )   
                {       
                    //alert("i=[" + i + "] j=[" + j +"]" );     
                    if ( cnt == 3 )     
                    {           
                        dtexto = dtexto + '.';          
                        j++;            
                        dtexto = dtexto + invertido.charAt(i);          
                        cnt = 1;        
                    }       
                    else        
                    {               
                        dtexto = dtexto + invertido.charAt(i);          
                        cnt++;      
                    }   
                }   

                invertido = ""; 
                for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )      
                    invertido = invertido + dtexto.charAt(i);   

                //window.document.form1.rut.value = invertido.toUpperCase()       

                if ( revisarDigito2(texto) )        
                    return true;    

                return false;
            }, "Error: Rut no valido, favor revisar");

            // validate signup form on keyup and submit
            $("#addUserform").validate({
                rules: {
                    rut: {
                        required: true,
                        regexp: "^([0-9]+)-[0-9|kK]$",
                        validRut: true

                    },
                    names: {
                        required: true,
                        regexp: "^[A-ZÑa-zñ áéíóúÁÉÍÓÚ]+$"
                    },
                    firstLastName: {
                        required: true,
                        regexp: "^[A-ZÑa-zñ áéíóúÁÉÍÓÚ]+$"
                    },
                    secondLastName: {
                        required: true,
                        regexp: "^[A-ZÑa-zñ áéíóúÁÉÍÓÚ]+$"
                    },
                    birthDate: {
                        required: true,
                        regexp: "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/[0-9]{4}$"
                    },
                    address: {
                        required: true,
                        regexp: "^[0-9a-zA-zñ ]+$"
                    },
                    state: {
                        required: true,
                        regexp: "^[A-Za-zñ ]+$"
                    },
                    password: {
                        required: true,
                        regexp: "^.{6,15}$"
                    },
                    email: {
                        required: true,
                        regexp: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$"
                    },
                    phone: {
                        required: true,
                        regexp: "[0-9]{8}$"
                    },
                    phoneMobile: {
                        required: true,
                        regexp: "[0-9]{8}$"
                    },
                    sickness: {},
                    comments: {}
                },
                messages: {
                    rut: {
                        regexp: "Formato Incorrecto, Ej: 00000000-k (Sin puntos y con guión)"
                    },
                    names: {
                        regexp: "Formato Incorrecto: Solo letras"
                    },
                    firstLastName: {
                        regexp: "Formato Incorrecto: Solo letras"
                    },
                    secondLastName: {
                        regexp: "Formato Incorrecto: Solo letras"
                    },
                    birthDate: {
                        regexp: "Formato Incorrecto: Ej: 31/12/1989"
                    },
                    address: {
                        regexp: "Formato Incorrecto: Números y letras"
                    },
                    state: {
                        regexp: "Formato Incorrecto: Solo letras"
                    },
                    password: {
                        regexp: "Formato Incorrecto: De 6 a 15 caracteres"
                    },
                    email: {
                        regexp: "Formato Incorrecto: Ej: Nombre_Apellido@dominio.com"
                    },
                    phone: {
                        regexp: "Formato Incorrecto: Ej: 88175035"
                    },
                    phoneMobile: {
                        regexp: "Formato Incorrecto: Ej: 84939155"
                    },
                },
                errorPlacement: function(error, element) {
                    error.css({
                        'color': 'red'
                    });
                    error.insertAfter(element);
                }
            });

        },
        isValidForm: function(){
            return $("#addUserform").valid();
        }
    }

    return addSwimmingPoolValidation;

});