import csv
import json

# JSON data
data = {
  "invoices": [
    {
      "id": "inv:0-ChASnduWG0UZeo9bVAg70a8XEPEJ",
      "version": 0,
      "location_id": "LJJRKZX08FCW9",
      "order_id": "nuUQtxhQdH5qBJu8taEau0mmu9IZY",
      "payment_requests": [
        {
          "uid": "9257f261-9ca6-4ce2-9fe4-0c58baa251ef",
          "request_type": "BALANCE",
          "due_date": "2030-01-24",
          "tipping_enabled": True,
          "computed_amount_money": {
            "amount": 2625,
            "currency": "USD"
          },
          "total_completed_amount_money": {
            "amount": 0,
            "currency": "USD"
          },
          "reminders": [
            {
              "uid": "14c8859d-e9c4-4551-95cd-707d8895fe96",
              "relative_scheduled_days": -1,
              "message": "Your invoice is due tomorrow",
              "status": "PENDING"
            }
          ],
          "automatic_payment_source": "NONE"
        }
      ],
      "primary_recipient": {
        "customer_id": "X0JXG1AFWYS10ETCKGR4KNZ6MC",
        "given_name": "s",
        "family_name": "s",
        "email_address": "a@gmail.com"
      },
      "invoice_number": "eedf64a2-be61-40f7-8829-b6263d739c8f",
      "title": "Event Planning Services",
      "description": "We appreciate your business!",
      "scheduled_at": "2030-01-13T10:00:00Z",
      "status": "DRAFT",
      "timezone": "UTC",
      "created_at": "2023-10-17T09:55:22Z",
      "updated_at": "2023-10-17T09:55:22Z",
      "accepted_payment_methods": {
        "card": True,
        "square_gift_card": False,
        "bank_account": False,
        "buy_now_pay_later": False,
        "cash_app_pay": False
      },
      "delivery_method": "EMAIL",
      "sale_or_service_date": "2030-01-24",
      "store_payment_method_enabled": False
    },
    {
      "id": "inv:0-ChBa5R5yAghXhRKf6ahu3acVEPEJ",
      "version": 0,
      "location_id": "LJJRKZX08FCW9",
      "order_id": "L6dI8OtHih4TdiJYk3byFIRcyffZY",
      "payment_requests": [
        {
          "uid": "4d0038e7-f462-4e24-be9e-69df12a567b9",
          "request_type": "BALANCE",
          "due_date": "2030-01-24",
          "tipping_enabled": True,
          "computed_amount_money": {
            "amount": 92,
            "currency": "USD"
          },
          "total_completed_amount_money": {
            "amount": 0,
            "currency": "USD"
          },
          "reminders": [
            {
              "uid": "ffd26fa1-bab6-4aff-ad39-3ab5e778a64d",
              "relative_scheduled_days": -1,
              "message": "Your invoice is due tomorrow",
              "status": "PENDING"
            }
          ],
          "automatic_payment_source": "NONE"
        }
      ],
      "primary_recipient": {
        "customer_id": "QQMENKX5B1GJ6BFFJJCEND8E48",
        "given_name": "s",
        "family_name": "s",
        "email_address": "jashwanth0712@gmail.com"
      },
      "invoice_number": "5d016637-8b87-4b9d-b2fe-6245ce80ea25",
      "title": "Event Planning Services",
      "description": "We appreciate your business!",
      "scheduled_at": "2030-01-13T10:00:00Z",
      "status": "DRAFT",
      "timezone": "UTC",
      "created_at": "2023-10-17T09:53:55Z",
      "updated_at": "2023-10-17T09:53:55Z",
      "accepted_payment_methods": {
        "card": True,
        "square_gift_card": False,
        "bank_account": False,
        "buy_now_pay_later": False,
        "cash_app_pay": False
      },
      "delivery_method": "EMAIL",
      "sale_or_service_date": "2030-01-24",
      "store_payment_method_enabled": False
    },
]
}

# Define the CSV file name
csv_file = "invoices.csv"

# Extract the list of invoices from the JSON data
invoices = data.get("invoices", [])

# Define the CSV headers based on the keys in the JSON data
csv_headers = [
    "id",
    "version",
    "location_id",
    "order_id",
    "payment_requests",
    "primary_recipient",
    "invoice_number",
    "title",
    "description",
    "scheduled_at",
    "status",
    "timezone",
    "created_at",
    "updated_at",
    "accepted_payment_methods",
    "delivery_method",
    "sale_or_service_date",
    "store_payment_method_enabled"
]

# Create and open the CSV file for writing
with open(csv_file, mode="w", newline="") as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=csv_headers)
    
    # Write the CSV header row
    writer.writeheader()

    # Loop through each invoice and write its data to the CSV file
    for invoice in invoices:
        writer.writerow({
            "id": invoice["id"],
            "version": invoice["version"],
            "location_id": invoice["location_id"],
            "order_id": invoice["order_id"],
            "payment_requests": json.dumps(invoice["payment_requests"]),
            "primary_recipient": json.dumps(invoice["primary_recipient"]),
            "invoice_number": invoice["invoice_number"],
            "title": invoice["title"],
            "description": invoice["description"],
            "scheduled_at": invoice["scheduled_at"],
            "status": invoice["status"],
            "timezone": invoice["timezone"],
            "created_at": invoice["created_at"],
            "updated_at": invoice["updated_at"],
            "accepted_payment_methods": json.dumps(invoice["accepted_payment_methods"]),
            "delivery_method": invoice["delivery_method"],
            "sale_or_service_date": invoice["sale_or_service_date"],
            "store_payment_method_enabled": invoice["store_payment_method_enabled"]
        })

print(f"CSV file '{csv_file}' has been created.")
