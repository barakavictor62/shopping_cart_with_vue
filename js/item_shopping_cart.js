var additionalCosts ={
    "shipping": 100,
    "tax":50
}

$(document).ready(function(){
  
    //initializing a vue.js instance
    const app = new Vue({
        el : "#app",
        data :{
            cake_items:[], //all cake items
            items_chosen: [], //shopping cart items as chosen by a user
            additionalCosts: additionalCosts, //any aditional costs attached to the items on sale
        },
        created(){
            //pulling data from a database
            fetch("http://localhost/side-shopping-cart/side-shopping-cart/backend/pull_all.php")
            .then(response => response.json())
            .then(cakes => {
                cakes.forEach(item => {
                    item["cake_weight"] = 1;
                  });
                  this.cake_items = cakes
            })
        },
        computed: {
            // compute subtotal and update the document object model (DOM) when changes occur
            subTotal: function() {
              var subtotal = 0;

              //loop through all items in the shopping cart and compute subtotal
              this.items_chosen.forEach(item => {
                item_price = item.cake_price*item.cake_weight;
                subtotal += (parseInt(item_price)*item.cake_quantity);
              });
              return subtotal;
            },

            //compute the sum total fro all items chosen by user plus additional costs
            sumTotal: function(){
                var total;

                //Total costs equals zero if cart is empty
                if(Object.keys(this.items_chosen).length === 0){
                    total = 0;
                }

                //compute total if cart contains items
                if(Object.keys(this.items_chosen).length > 0){
                    temptotal = this.subTotal;
                    tax = parseInt(this.additionalCosts.tax);
                    shipping = parseInt(this.additionalCosts.shipping);
                    total = (temptotal+tax+shipping);
                }
                return total;
            },
          },
        methods:{
            //push items to the shopping cart as a user selects them
            addToCart(itemToAdd){
                var found = false;
                this.items_chosen.forEach(item => {
                    if (item.cake_id === itemToAdd.cake_id && item.cake_weight === itemToAdd.cake_weight) {
                        found = true;
                        item.cake_quantity += 1;
                    }
                });
                if (found === false) {
                    itemToAdd.cake_quantity =1;
                    this.items_chosen.push(Vue.util.extend({}, itemToAdd));
                  }
            },

            //remove items from the cart following a users actions
            removeFromCart(itemToRemove){

                this.items_chosen.splice(this.items_chosen.indexOf(itemToRemove), 1);

            },
            checkOut(){
                $.ajax({
                    url:"http://localhost/side-shopping-cart/side-shopping-cart/backend/backend.php",
                    method:"POST",
                    data: JSON.stringify(this.items_chosen)
                }).done(function(response){
                    console.log(response);
                }).fail(function(jqXHR, textStatus){
                    console.log(textStatus, jqXHR);
                });
            },
        }
    })
});