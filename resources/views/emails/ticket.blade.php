<html>
<head>
    <title>

    </title>
</head>

<body>

<h4>User Details</h4>
<table class="table table-review">
    <tr>
        <td>Last Name</td>
        <td><strong>{{ $ticket['customer_last_name'] }}</strong></td>
    </tr>
    <tr>
        <td>First Name</td>
        <td><strong>{{ $ticket['customer_first_name'] }}</strong></td>
    </tr>
    <tr>
        <td>Email</td>
        <td><strong>{{ $ticket['customer_email'] }}</strong></td>
    </tr>
    <tr>
        <td>Phone</td>
        <td><strong>{{ $ticket['customer_phone_number'] }}</strong></td>
    </tr>
</table>
</div>

<div class="col-sm-6">


    <h4>Gadget Details</h4>
    <table class="table table-review">
        <tr>
            <td>Make</td>
            <td><strong>{{ $ticket['gadget']['gadget_maker']['name'] }}</strong></td>
        </tr>
        <tr>
            <td>Model</td>
            <td><strong>{{ $ticket['gadget']['model'] }}</strong></td>
        </tr>

        <tr>
            <td>IMEI Number</td>
            <td><strong>{{ $ticket['customer_device_imei'] }}</strong></td>
        </tr>

        <tr>
            <td>Size</td>
            <td><strong>{{ $ticket['size']['value'] }}</strong></td>
        </tr>
        <tr>
            <td>Grade</td>
            <td><strong>{{ $ticket['device_grade'] }}</strong></td>
        </tr>
    </table>
</div>
<h4>Swap Benefits</h4>

<table class="table table-review">
    <tr>
        <td>Reward</td>
        <td><strong>{{ $ticket['reward'] }}</strong></td>
    </tr>
    <tr>
        <td>Bonus</td>
        <td><strong>{{ $ticket['network']['description'] }}</strong></td>
    </tr>

    <tr>
        <td>Port To Airtel</td>
        <td><strong>{{ $ticket['port_to_airtel'] ? 'Yes' : 'No' }}</strong></td>
    </tr>
</table>

</body>
</html>