<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport pour le client</title>
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
            margin-top: 70px;
        }

        .container {
            width: 600px;
            margin: 0 auto;
            padding: 10px;
            page-break-inside: avoid;
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

        h1 {
            text-align: center;
            font-size: 20px;
            margin-bottom: 10px;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .info-table th,
        .info-table td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
            font-size: 12px;
        }

        .info-table th {
            background-color: #f2f2f2;
            width: 30%;
        }

        .main-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .main-table th,
        .main-table td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
            font-size: 12px;
        }

        .main-table th {
            background-color: #f2f2f2;
        }

        .signature {
            margin-top: 50px;
            font-size: 12px;
        }

        .signature-table {
            width: 100%;
            margin-top: 50px;
        }

        .signature-table td {
            width: 50%;
            text-align: center;
        }
    </style>
</head>
{{-- @dd($ticket) --}}

<body>
    <div class="container">
        <table class="header-table">
            <tr>
                <td>
                    <img src="https://i.ibb.co/k23NwKQ/images.jpg" alt="Logo">
                </td>
                <td class="header-info">
                    {{ $ticket->technician->current_address }},<br>
                    {{ $ticket->technician->city }}, MOROCCO<br>
                    Fix: +212 522446455<br>
                    <strong>Atelier Cbi/Dell</strong><br>
                </td>
            </tr>
        </table>

        @if ($ticket->finished_date)
            <h1>Bon de livraison</h1>
        @else
            <h1>Bon de reception</h1>
        @endif

        <table class="info-table">
            <tr>
                <th>Numéro d'ordre de travail</th>
                <td>{{ $ticket->id }}</td>
            </tr>
            <tr>
                <th>Date d'entrée </th>
                <td>{{ $ticket->created_at }}</td>
            </tr>
            <tr>
                <th>Date de sortie</th>
                <td>{{ $ticket->finished_date ? $ticket->finished_date : '-' }}</td>
                </td>
            </tr>
            <tr>
                <th>Technicien de service</th>
                <td>{{ $ticket->technician->first_name }} {{ $ticket->technician->last_name }}</td>
            </tr>
            <tr>
                <th>Type de service</th>
                <td>{{ $ticket->service_type }}</td>
            </tr>
        </table>

        <table class="info-table">
            <tr>
                <th>Marque</th>
                <td>DELL</td>
            </tr>
            <tr>
                <th>Nom de modèle</th>
                <td>{{ $ticket->laptop->model_name }}</td>
            </tr>
            <tr>
                <th>Numéro de modèle</th>
                <td>{{ $ticket->laptop->model_number }}</td>
            </tr>
            <tr>
                <th>Numéro de série</th>
                <td>{{ $ticket->laptop->tag }}</td>
            </tr>
            <tr>
                <th>Pièces reçues</th>
                <td>{{ $ticket->laptop->comment }}</td>
            </tr>
        </table>

        <table class="info-table">
            <tr>
                <th>Nom du client</th>
                <td>{{ $ticket->contact->client->name }}</td>
            </tr>
            <tr>
                <th>Adresse</th>
                <td>{{ $ticket->contact->client->address }}</td>
            </tr>
            <tr>
                <th>Nom du contact</th>
                <td>{{ $ticket->contact->name }}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{{ $ticket->contact->email }}</td>
            </tr>
            <tr>
                <th>Numéro de téléphone</th>
                <td>{{ $ticket->contact->phone }}</td>
            </tr>
            <tr>
                <th>Ville</th>
                <td>{{ $ticket->contact->city }}</td>
            </tr>
            <tr>
                <th>Pays</th>
                <td>{{ $ticket->contact->country }}</td>
            </tr>
            <tr>
                <th>Probmème signalé</th>
                <td>{{ $ticket->laptop->comment }}</td>
            </tr>
            @foreach ($ticket->orders as $order)
                <tr>
                    <th>Diagnostic par technician</th>
                    <td>{{ $order->diagnostic_content }}</td>
                </tr>
                <tr>
                    <th>Les pièces remplacé</th>
                    <td>
                        @foreach ($order->parts as $part)
                            <div>{{ $part->name }}</div>
                        @endforeach
                    </td>
                </tr>
            @endforeach
        </table>

        <table class="signature-table">
            <tr>
                <td><strong>Signature Cbi/Dell:</strong></td>
                <td><strong>Signature client:</strong></td>
            </tr>
        </table>
    </div>
</body>

</html>
