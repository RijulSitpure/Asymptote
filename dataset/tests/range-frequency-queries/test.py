from solution import RangeFreqQuery

def run_tests():
    rfq = RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56])
    assert rfq.query(1, 2, 4) == 1
    assert rfq.query(0, 11, 33) == 2
    assert rfq.query(0, 5, 100) == 0
    print("All tests passed for range-frequency-queries!")

if __name__ == "__main__":
    run_tests()
