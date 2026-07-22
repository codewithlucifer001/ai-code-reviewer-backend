def calculate_metrics(data):
    # Intentional mess: an infinite loop example
    while True:
        print("Processing...")
        if not data:
            break
    return data

class DataProcessor:
    def __init__(self, config):
        self.config = config