export function emailTemplate(info){
  return (
    `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Template</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

  <!-- Header -->
  <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
    <tr>
      <td style="padding: 20px;">
        <img src="https://sparksync.pro/wp-content/uploads/2023/05/Logo-1.svg" alt="Logo" width="150">
      </td>
    </tr>
  </table>

  <!-- Location Address -->
  <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
    <tr>
      <td style="padding: 20px;">
        <h3>Event Location:</h3>
        <p>${info.Address}, USA</p>
      </td>
    </tr>
  </table>

  <!-- Images Section -->
  <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
    <tr>
      <td style="padding: 20px;">
        <img src="${info.frontImage}" alt="Image 1" width="300">
      </td>
      <td style="padding: 20px;">
        <img src="${info.backImage}" alt="Image 2" width="300">
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f4f4">
    <tr>
      <td style="padding: 20px;">
        <p>&copy; 2023 Spark Sync. All rights reserved.</p>
      </td>
    </tr>
  </table>

</body>
</html>

    `
  )
}
