<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport Des pièces demander</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }

        body {
            font-family: Arial, sans-serif;
        }

        h1 {
            margin-bottom: 20px;
            text-align: center;
            font-size: 24px;
            color: #333;
        }

        .container {
            width: 100%;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header-table {
            width: 100%;
            margin-bottom: 20px;
        }

        .header-table td {
            vertical-align: top;
        }

        .header-table img {
            height: 90px;
        }

        .header-table .header-info {
            text-align: right;
            font-size: 14px;
        }

        .info-table,
        .main-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            margin-top: 70px;
        }

        .info-table th,
        .info-table td,
        .main-table th,
        .main-table td {
            border: 1px solid #ddd;
            padding: 8px;
            font-size: 14px;
        }

        .info-table th,
        .main-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        .parts-container {
            width: 100%;
            margin-top: 70px;
            text-align: center;
        }

        .part-item {
            display: inline-block;
            width: 170px;
            height: 160px;
            margin: 5px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }

        .part-item img {
            max-width: 160px;
            height: 140px;
            border-radius: 4px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <table class="header-table">
            <tr>
                <td>
                    <img src="https://i.ibb.co/k23NwKQ/images.jpg" alt="Logo">
                </td>
                <td class="header-info">
                    {{ $order->technician->current_address }},<br>
                    {{ $order->technician->city }}, MOROCCO<br>
                    Fix: +212 522446455<br>
                    <strong>Atelier Cbi/Dell</strong>
                </td>
            </tr>
        </table>

        <table class="info-table">
            <tr>
                <th>Numéro d'ordre de travail</th>
                <td>{{ $order->ticket->id }}</td>
            </tr>
            <tr>
                <th>Technicien</th>
                <td>{{ $order->technician->first_name }} {{ $order->technician->last_name }}</td>
            </tr>
            <tr>
                <th>Diagnostic content</th>
                <td>{{ $order->diagnostic_content }}</td>
            </tr>
        </table>

        <h1>Les pièces demander</h1>

        <div class="parts-container">
            @foreach ($order->parts as $part)
                <div class="part-item">
                    <img src="{{ 'images/'.$part->part_picture }}" alt="{{ $part->name }}">
                    <div>{{ $part->name }}</div>
                </div>
            @endforeach
        </div>
    </div>
</body>

</html>
