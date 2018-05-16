$(document).ready(function(){

  fetch_data();
 
  function fetch_data()
  {
   $.ajax({
    url:"fetch.php",
    success:function(data)
    {
     $('tbody').html(data);
    }
   })
  }
 
  $('#add_button').click(function(){
   $('#action').val('insert');
   $('#button_action').val('Insert');
   $('.modal-title').text('Add Data');
   $('#apicrudModal').modal('show');
  });
 
  $('#api_crud_form').on('submit', function(event){
   event.preventDefault();
   if($('#first_name').val() == '')
   {
    alert("Enter First Name");
   }
   else if($('#last_name').val() == '')
   {
    alert("Enter Last Name");
   }
   else
   {
    var form_data = $(this).serialize();
    $.ajax({
     url:"action.php",
     method:"POST",
     data:form_data,
     success:function(data)
     {
      fetch_data();
      $('#api_crud_form')[0].reset();
      $('#apicrudModal').modal('hide');
      if(data == 'insert')
      {
       alert("Data Inserted");
      }
      if(data == 'update')
      {
       alert("Data Updated");
      }
     }
    });
   }
  });
 
  $(document).on('click', '.edit', function(){
   var id = $(this).attr('id');
   var action = 'fetch_single';
   $.ajax({
    url:"action.php",
    method:"POST",
    data:{id:id, action:action},
    dataType:"json",
    success:function(data)
    {
     $('#hidden_id').val(id);
     $('#first_name').val(data.first_name);
     $('#last_name').val(data.last_name);
     $('#action').val('update');
     $('#button_action').val('Update');
     $('.modal-title').text('Edit Data');
     $('#apicrudModal').modal('show');
    }
   })
  });
 
  $(document).on('click', '.delete', function(){
   var id = $(this).attr("id");
   var action = 'delete';
   if(confirm("Are you sure you want to remove this data ?"))
   {
    $.ajax({
     url:"action.php",
     method:"POST",
     data:{id:id, action:action},
     success:function(data)
     {
      fetch_data();
      alert("Data Deleted");
     }
    });
   }
  });
 
 });