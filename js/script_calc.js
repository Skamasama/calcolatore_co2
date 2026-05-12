//in fondo c'è la roba del layout che abbiamo usato

//aggiunte (a quanto pare i valori non si calcolano allo start della pagina e il totale non funziona)
//consigliato da un'AI, insufficiente :/
function initializePage() {
  // Calculate initial totals
  calculateTotal_alloggi();
  calculateTotal_trasporti();
  calculateTotal_cibi();
  calculateTotal_extra();
  
  // Update total emissions
  calcola_totale_emissioni();
  
  document.getElementById("total_alloggi").addEventListener("input", calcola_totale_emissioni);
  document.getElementById("total_trasporti").addEventListener("input", calcola_totale_emissioni);
  document.getElementById("total_cibi").addEventListener("input", calcola_totale_emissioni);
  document.getElementById("total_extra").addEventListener("input", calcola_totale_emissioni);

}

window.onload=function(){
	initializePage();
};


//COPPETTI:
function addRow_alloggi() {
			var table_alloggi = document.getElementById("alloggi");
			var row_alloggi = table_alloggi.insertRow();
			var qtyCell_numero_persone_alloggi = row_alloggi.insertCell(0);
			var qtyCell_alloggi = row_alloggi.insertCell(1);
			var productCell_alloggi = row_alloggi.insertCell(2);
			var priceCell_alloggi = row_alloggi.insertCell(3);
            var removeBtn_alloggi = row_alloggi.insertCell(4);
           

qtyCell_numero_persone_alloggi.innerHTML = '<input name="numero_persone_alloggi" type="number" min="1" max="999" value="1" onchange="calculateTotal_alloggi();">';


			qtyCell_alloggi.innerHTML = '<input name="numero_alloggi" type="number" min="1" max="999" value="1" onchange="calculateTotal_alloggi();">';
			productCell_alloggi.innerHTML = '<select name="sel_alloggi" onchange="calculateTotal_alloggi()"><option value="A">Hotel </option><option value="B">Ostello</option><option value="C">Campeggio</option><option value="D">Tenda (dotata di fornello a butano)</option></select>';
			priceCell_alloggi.innerHTML = '10';
            removeBtn_alloggi.innerHTML = '<button name="btn_alloggi" type="button" onclick="removeRow2(this),calculateTotal_alloggi()">Remove</button>';
		}

		function removeRow(tableID) {
			var table = document.getElementById(tableID);
			if (table.rows.length > 1) {
				table.deleteRow(-1);
			}
		}
        
        // Function to remove a row
		function removeRow2(button) {
			// Get the table row that contains the button
			var row = button.parentNode.parentNode;
			// Get the table that contains the row
			var table = row.parentNode;
			// Remove the row from the table
			table.removeChild(row);
			// Update the total
			calculateTotal_alloggi();
          
		}
        

		function calculateTotal_alloggi() {
			var table = document.getElementById("alloggi");
			var total = 0;
			for (var i = 1; i < table.rows.length; i++) {
				var npersall = parseInt(table.rows[i].cells[0].querySelector('input').value);
				var qty = parseInt(table.rows[i].cells[1].querySelector('input').value);
				var product = table.rows[i].cells[2].querySelector('select').value;
				var price = 0;
				if (product === 'A') {
					price = 14.3					;
				} else if (product === 'B') {
					price = 4.19;
				} else if (product === 'C') {
					price = 1.53;
				}else if (product === 'D') {
					price = 0.36;
				}
				var subTotal = qty * price*npersall;
				table.rows[i].cells[3].innerHTML = (+subTotal.toFixed(2));
				total += subTotal;
			}
			document.getElementById("total_alloggi").value = (+total.toFixed(2))+"kg";;
            
            calcola_totale_emissioni();
            
		}
        
        
        
        //trasporti
        
        
        function addRow_trasporti() {
			var table_trasporti = document.getElementById("trasporti");
			var row_trasporti = table_trasporti.insertRow();
			var qtyCell_numero_persone_trasporti = row_trasporti.insertCell(0);
			var qtyCell_trasporti = row_trasporti.insertCell(1);
			var productCell_trasporti = row_trasporti.insertCell(2);
			var priceCell_trasporti = row_trasporti.insertCell(3);
            var andata_trasporti = row_trasporti.insertCell(4)
            
            var removeBtn_trasporti = row_trasporti.insertCell(5);
           

qtyCell_numero_persone_trasporti.innerHTML = '<input name="numero_persone_trasporti" type="number" min="1" max="999" value="1" onchange="calculateTotal_trasporti();">';

			qtyCell_trasporti.innerHTML = '<input name="numero_trasporti" type="number" min="1" max="999" value="1" onchange="calculateTotal_trasporti();">';
			productCell_trasporti.innerHTML = '<select name="sel_trasporti" onchange="calculateTotal_trasporti()"><option value="D">Macchina</option><option value="E">Moto</option><option value="F">Bus</option></option><option value="G">Nave</option></option><option value="H">Treno/Metro/Tram</option></select>';
			priceCell_trasporti.innerHTML = '10';
            andata_trasporti.innerHTML='<input type="checkbox" id="and_rit" checked="checked" onchange="calculateTotal_trasporti()">';
            removeBtn_trasporti.innerHTML = '<button name="btn_trasporti" type="button" onclick="removeRow2(this),calculateTotal_trasporti()">Remove</button>';
		}
        
        function calculateTotal_trasporti() {
			var table = document.getElementById("trasporti");
			var total = 0;
			for (var i = 1; i < table.rows.length; i++) {
				var nperstra = parseInt(table.rows[i].cells[0].querySelector('input').value);
				var qty = parseInt(table.rows[i].cells[1].querySelector('input').value);
				var product = table.rows[i].cells[2].querySelector('select').value;
				var price = 0;
                var a_r = table.rows[i].cells[4].querySelector('input[type=checkbox]').checked;
                
                
				if (product === 'D') {
					price = 0.1513804 ;
				} else if (product === 'E') {
					price = 0.10749;
				} else if (product === 'F') {
					price = 0.10214;
				}
				else if (product === 'G') {
					price = 0.11286;
				}
else if (product === 'G') {
					price = 0.0240925;
				}
                
               // alert (a_r);
    
                
                  
                
				var subTotal = qty * price*nperstra;
                
                if(a_r==true)
                    subTotal=subTotal*2;
                
				table.rows[i].cells[3].innerHTML = +subTotal.toFixed(2)+"kg";
				total += subTotal;
			}
			document.getElementById("total_trasporti").value = (+total.toFixed(2))+"kg";
            
            calcola_totale_emissioni();
        
            
		}
        
        
        function calcola_totale_emissioni()
        
        {
           var tot_emissioni=0;
           totale_emissioni=parseFloat(document.getElementById("total_alloggi").value)+parseFloat(document.getElementById("total_trasporti").value)+parseFloat(document.getElementById("total_cibi").value)+parseFloat(document.getElementById("total_extra").value);
            var compensazione_1=Math.ceil(totale_emissioni/700);
            var compensazione_2=Math.ceil(totale_emissioni/50);
			var compensazione_3=Math.ceil(totale_emissioni/10);
           // alert(totale_emissioni);
            document.getElementById("totale_emissioni").innerHTML="La gita ha causato inquinamento equivalente a <b>"+totale_emissioni.toFixed(2)+"kg</b> di CO<sub>2</sub>"+"<br>Tali emissioni possono essere compensate:<ul><li>Piantando "+compensazione_1+" alberi di mango</li>"+"<li>Piantando "+compensazione_2+" alberi di melograno</li>"+"<li>Piantando "+compensazione_3+" alberi di vite</li>"+"</ul>";
            
        }
        
        
        
        
        //fine trasporti
        
        
//inizio sezione cibi

function addRow_cibi() {
			var table_cibi = document.getElementById("cibi");
			var row_cibi = table_cibi.insertRow();
			var qtyCell_cibi = row_cibi.insertCell(0);
			var productCell_cibi = row_cibi.insertCell(1);
			var priceCell_cibi = row_cibi.insertCell(2);
            var removeBtn_cibi = row_cibi.insertCell(3);
           
			qtyCell_cibi.innerHTML = '<input name="numero_cibi" type="number" min="1" max="999" value="1" onchange="calculateTotal_cibi();">';
			productCell_cibi.innerHTML = '<select name="sel_cibi" onchange="calculateTotal_cibi()"><optgroup label="colazione"><option value="E" >cereali</option><option value="F">frutta secca</option><option value="G">Burro</option><option value="H">bustina zucchero</option><option value="I">porzione marmellata</option><option value="J">1 uovo</option><option value="K">200ml latte</option><option value="L">tazzina di caffe</option><option value="M">bicchiere di acqua</option><option value="N">bottiglia da mezzo litro di acqua</option><option value="O">bottiglia da 1 litro di acqua</option><option value="P">succo 200ml</option></optgroup><optgroup label="pranzo"><option value="PE">1 porzione di pasta</option><option value="PF">1 porzione ravioli o simili</option><option value="PG">1 porzione di riso</option><option value="PH">1 porzione di carne di manzo</option><option value="PI">1 porzione di carne di pollo</option><option value="PJ">1 porzione di carne di maiale</option><option value="PK">1 porzione di pesce</optio			n><option value="PL">1 uovo</option><option value="PM">1 pizza</option><option value="PN">1 porzione di formaggio (50g)</option><option value="PO">1 porzione di legumi</option><option value="PP">bicchiere di acqua</option><option value="PQ">bottiglia da mezzo litro di acqua</option><option value="PR">bottiglia da 1 litro di acqua</option><option value="PS">bottiglia di birra (33cl)</option><option value="PT">bottiglia di birra (mezzo litro)</option><option value="PU">mezzo litro di vino</option><option value="PV">calice di vino</option><option value="PW">bibita in lattina</option><option value="PX">tazzina di caffe</option></optgroup><optgroup label="cena"><option value="CE">1 porzione di pasta</option><option value="CF">1 porzione ravioli o simili</option><option value="CG">1 porzione di riso</option><option value="CH">1 porzione di carne di manzo</option><option value="CI">1 porzione di carne di pollo</option><option value="CJ">1 porzione di carne di maiale</option><option value="CK">1 porzione di pesce<			/option><option value="CL">1 uovo</option><option value="CN">1 porzione di formaggio (50g)</option><option value="CO">1 porzione di legumi</option><option value="CP">bicchiere di acqua</option><option value="CQ">bottiglia da mezzo litro di acqua</option><option value="CR">bottiglia da 1 litro di acqua</option><option value="CS">bottiglia di birra (33cl)</option><option value="CT">bottiglia di birra (mezzo litro)</option><option value="CU">mezzo litro di vino</option><option value="CV">calice di vino</option><option value="CW">bibita in lattina</option><option value="CX">tazzina di caffe</option></optgroup></select>';
			priceCell_cibi.innerHTML = '10';
            removeBtn_cibi.innerHTML = '<button name="btn_cibi" type="button" onclick="removeRow2(this),calculateTotal_cibi()">Remove</button>';
		}

		function removeRow(tableID) {
			var table = document.getElementById(tableID);
			if (table.rows.length > 1) {
				table.deleteRow(-1);
			}
		}


	function calculateTotal_cibi() {
			var table = document.getElementById("cibi");
			var total = 0;
			for (var i = 1; i < table.rows.length; i++) {
				var qty = parseInt(table.rows[i].cells[0].querySelector('input').value);
				var product = table.rows[i].cells[1].querySelector('select').value;
				var price = 0;
				if (product === 'E') {
					price = 0.056;
				} else if (product === 'F') {
					price = 0.006;
				} else if (product === 'G') {
					price = 0.2975;
				} else if (product === 'H') {
					price = 0.045;
				} else if (product === 'I') {
					price = 0.0815;
				} else if (product === 'J') {
					price = 0.2385;
				} else if (product === 'K') {
					price = 0.56;
				} else if (product === 'L') {
					price = 0.132;
				} else if (product === 'M') {
					price = 0.48;
				} else if (product === 'N') {
					price = 1.6;
				} else if (product === 'O') {
					price = 3.2;
				} else if (product === 'P') {
					price = 0.55;
				} else if (product === 'PE') {
					price = 0.01;
				} else if (product === 'PF') {
					price = 0.18;
				} else if (product === 'PG') {
					price = 0.336;
				} else if (product === 'PH') {
					price = 13;
				} else if (product === 'PI') {
					price = 1.02;
				} else if (product === 'PJ') {
					price = 1.23;
				} else if (product === 'PK') {
					price = 1.24;
				} else if (product === 'PL') {
					price = 0.2385;
				} else if (product === 'PM') {
					price = 0.875;
				} else if (product === 'PN') {
					price = 1.2;
				} else if (product === 'PO') {
					price = 0.055;
				} else if (product === 'PP') {
					price = 0.48;
				} else if (product === 'PQ') {
					price = 1.6;
				} else if (product === 'PR') {
					price = 3.2;
				} else if (product === 'PS') {
					price = 0.3;
				} else if (product === 'PT') {
					price = 0.45;
				} else if (product === 'PU') {
					price = 0.55;
				} else if (product === 'PV') {
					price = 0.2;
				} else if (product === 'PW') {
					price = 0.185;
				} else if (product === 'PX') {
					price = 0.132;
				} else if (product === 'CE') {
					price = 0.01;
				} else if (product === 'CF') {
					price = 0.18;
				} else if (product === 'CG') {
					price = 0.336;
				} else if (product === 'CH') {
					price = 13;
				} else if (product === 'CI') {
					price = 1.02;
				} else if (product === 'CJ') {
					price = 1.23;
				} else if (product === 'CK') {
					price = 1.24;
				} else if (product === 'CL') {
					price = 0.2385;
				} else if (product === 'CM') {
					price = 0.875;
				} else if (product === 'CN') {
					price = 1.2;
				} else if (product === 'CO') {
					price = 0.055;
				} else if (product === 'CP') {
					price = 0.48;
				} else if (product === 'CQ') {
					price = 1.6;
				} else if (product === 'CR') {
					price = 3.2;
				} else if (product === 'CS') {
					price = 0.3;
				} else if (product === 'CT') {
					price = 0.45;
				} else if (product === 'CU') {
					price = 0.55;
				} else if (product === 'CV') {
					price = 0.2;
				} else if (product === 'CW') {
					price = 0.185;
				} else if (product === 'CX') {
					price = 0.132;
				} 
				var subTotal = qty * price;
				table.rows[i].cells[2].innerHTML = +subTotal.toFixed(2)+"kg";
				total += subTotal;
			}
			document.getElementById("total_cibi").value = (+total.toFixed(2))+"kg";;
            
            calcola_totale_emissioni();
            
		}


//fine sezione cibi




// inizio sezione EXTRA

function addRow_extra() {
			var table_extra = document.getElementById("extra");
			var row_extra = table_extra.insertRow();
			var qtyCell_extra = row_extra.insertCell(0);
			var productCell_extra = row_extra.insertCell(1);
			var priceCell_extra = row_extra.insertCell(2);
            var removeBtn_extra = row_extra.insertCell(3);
           
			qtyCell_extra.innerHTML = '<input name="numero_extra" type="number" min="1" max="999" value="1" onchange="calculateTotal_extra();">';
			productCell_extra.innerHTML = '<select name="sel_extra" onchange="calculateTotal_extra()">';

			priceCell_extra.innerHTML = '10';
            removeBtn_extra.innerHTML = '<button name="btn_extra" type="button" onclick="removeRow2(this),calculateTotal_extra()">Remove</button>';
		}

		function removeRow(tableID) {
			var table = document.getElementById(tableID);
			if (table.rows.length > 1) {
				table.deleteRow(-1);
			}
		}


	function calculateTotal_extra() {
			var table = document.getElementById("extra");
			var total = 0;
			for (var i = 1; i < table.rows.length; i++) {
				var qty = parseInt(table.rows[i].cells[0].querySelector('input').value);
				var product = table.rows[i].cells[1].querySelector('select').value;
				var price = 0;
			if (product === 'H') {price = 0.013;} 

else if (product === 'I') {price = 0.045;} 

else if (product === 'J') {price = 0.06;}

else if (product === 'K') {price = 0.19;}

else if (product === 'HH') {price = 0.06;} 

else if (product === 'II') {price = 0.02;}

else if (product === 'IJ') {price = 0.02;}

else if (product === 'L') {price = 0.04;}

else if (product === 'M') {price = 0.025;}

else if (product === 'N') {price = 0.034;}

else if (product === 'LL') {price = 0.02;}

else if (product === 'LM') {price = 0.035;}

else if (product === 'MM') {price = 0.013;}

else if (product === 'LI') {price = 0.02;}

else if (product === 'O') {price = 2.2;}

else if (product === 'P') {price = 5;}

else if (product === 'Q') {price = 13;}

else if (product === 'R') {price = 0.34;}

else if (product === 'S') {price = 0.67;}

else if (product === 'T') {price = 136;}

else if (product === 'ZA') {price = 0.2;}

else if (product === 'ZB') {price = 0.4;}

else if (product === 'U') {price = 0.11;}

else if (product === 'V') {price = 1.6;}

else if (product === 'W') {price = 0.004;}
                
                
				var subTotal = qty * price;
				table.rows[i].cells[2].innerHTML = +subTotal.toFixed(2)+"kg";
				total += subTotal;
			}
			document.getElementById("total_extra").value = (+total.toFixed(2))+"kg";;
            
            calcola_totale_emissioni();
            
		}









//fine sezione EXTRA


// Trigger event on tab click
$('[dd-sidebar-tab]').on('click', function() {
	$('.sidebar-list-menu-active-bar').css('margin-top', ( $(this).attr('dd-active-tab')) * $(this).height());
	$('.sidebar-content').css('background', $(this).attr('dd-sidebar-tab'));
	$('.sidebar-list-menu li a').removeClass('active');
	$(this).addClass('active');
	$('html, body').animate({
        scrollTop: $("#content_"+$(this).attr('dd-active-tab')).offset().top
    }, 500);
});
// SCroll event
$(window).scroll(function(event) {
	var scrollPos = $(document).scrollTop();
    $('.sidebar-list-menu li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
    		$('.sidebar-list-menu li a').removeClass("active");
        	currLink.addClass('active');
            $('.sidebar-list-menu-active-bar').css('margin-top', ( currLink.attr('dd-active-tab') - 1) * currLink.height() );
            $('.sidebar-content').css('background', currLink.attr('dd-sidebar-tab'));
        }
    });
});
