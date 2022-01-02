 const {
     query_exec
 } = require('./function');

 async function get_quote_by_search(options) {
     if (typeof options.page !== 'undefined' && typeof options.limit !== 'undefined') {

         var page = options.page || 1;
         var limit = options.limit || 1000000;
         var search = options.search;
         var vdate = options.date;
         var orderby = options.orderby;
         var where = options.where;
         var total_records = 0;
         var filtered_records = 0;
         var offset = (page - 1) * limit;
         var aColumns = "*";
         var vaColumns = ["quote_number", "quote_date"];
         var sWhere = "where 1=1";
         var join = "";
         var records = await query_exec("SELECT " + aColumns + " FROM `ep_quotes`  " + join + "  " + sWhere);
         total_records = records.length;
         if (where) {
             filtered_records = 1;
             if(where.status && where.status!=''){
             var condition="ep_quotes.status='"+where.status+"'";
             sWhere += " and " + condition;
             }
             if(where.customer_id && where.customer_id!=''){
                var condition="ep_quotes.customer_id='"+where.customer_id+"'";
                sWhere += " and " + condition;
                }
                if(where.quote_date && where.quote_date!=''){
                    var condition="ep_quotes.quote_date='"+where.quote_date+"'";
                    sWhere += " and " + condition;
                    }

         }
         if (vdate) {
             filtered_records = 1;
             sWhere += " AND(ep_quotes.quote_date LIKE '%" + vdate + "%')";

         }
         if (search) {
             filtered_records = 1;
             sWhere = " " + sWhere + "   AND (";
             //$sWhere = "$commn   AND (";
             for (var i = 0; i < vaColumns.length; i++) {

                 var row = search;
                 //sWhere += aColumns[i]+" LIKE '%"+row+"%' OR ";

                 if (vaColumns.length - 1 == i) {

                     sWhere += vaColumns[i] + " LIKE '%" + row + "%' ";
                 } else {

                     sWhere += vaColumns[i] + " LIKE '%" + row + "%' OR ";
                 }

             }


             sWhere += ')';
         }

         if (orderby) {
             orderby = "order by " + orderby;
         }


         var sql_query = "SELECT " + aColumns + " FROM `ep_quotes`  " + join + "  " + sWhere + " " + orderby + " LIMIT " + limit + " OFFSET " + offset;
         try {
             var result = await query_exec(sql_query);
             var records = await query_exec("SELECT " + aColumns + " FROM `ep_quotes`  " + join + "  " + sWhere);
             if (filtered_records)
                 filtered_records = records.length;
                // console.log(records);
                 console.log(result);
                 return (`{"status":"1","data":` + JSON.stringify(result) + `,"message":"Success","recordsTotal":"` + total_records + `","recordsFiltered":"` + filtered_records + `"}`); 
             
           
         } catch (err) {
            //  res.setHeader('Content-Type', 'application/json');
            //  res.status(200).send('{"status":"0","message":"Failed to get Customers","error":"' + err + '"}');
            return (`{"status":"0","message":"Failed to get Customers","error":"' + err + '"}`);
         }


     } else {
        //  res.setHeader('Content-Type', 'application/json');
        //  res.status(200).send('{"status":"0","message":"Query parameters page and limit required"}');
        return result = "";
     }
 }
 module.exports = {
     get_quote_by_search
 }