import csv

def generate_csv_file(file, servers :list):

    writer = csv.writer(file)
    writer.writerow(['ID', 'IP Address', 'Name', 'Memory', 'Type', 'Status', 'Server UP'])
    for server in servers:
        writer.writerow(server.data)
    
    return writer
