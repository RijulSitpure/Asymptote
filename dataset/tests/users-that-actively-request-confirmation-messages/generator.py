def generate_test_cases():
    cases = []
    cases.append({
        "Confirmations": [
            (3, '2021-01-06 03:30:46', 'timeout'),
            (3, '2021-01-06 16:30:46', 'timeout'),
            (7, '2021-06-12 11:57:29', 'confirmed'),
            (7, '2021-06-13 12:58:28', 'confirmed'),
            (2, '2021-01-22 00:00:00', 'confirmed'),
            (2, '2021-01-23 00:00:00', 'timeout')
        ]
    })
    return cases
