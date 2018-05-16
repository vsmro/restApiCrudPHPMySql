<?php
  $api_url = "http://localhost/weblesson_rest_api_crud_php/api/test_api.php?action=fetch_all";

  $client = curl_init($api_url);

  curl_setopt($client, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($client);

  $result = json_decode($response);

  $output = '';

  if(count($result) > 0) {
      foreach($result as $row) {
        $output .= '
          <tr>
            <td>'.$row->first_name.'</td>
            <td>'.$row->last_name.'</td>
            <td><button type="button" name="edit" class="btn btn-warning btn-xs edit" id="'.$row->id.'">Edit</button></td>
            <td><button type="button" name="delete" class="btn btn-danger btn-xs delete" id="'.$row->id.'">Delete</button></td>
          </tr>
        ';
      }
  } else {
    $output .= '
      <tr>
          <td colspan="4" aling="center">No DATA FOUND</td>
      </tr>
    ';
  }

  echo $output;
?>