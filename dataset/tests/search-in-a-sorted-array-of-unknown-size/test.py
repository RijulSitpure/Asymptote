import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'search-in-a-sorted-array-of-unknown-size.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class ArrayReader:
    def __init__(self, arr):
        self.arr = arr
    def get(self, index: int) -> int:
        if 0 <= index < len(self.arr):
            return self.arr[index]
        return 2147483647

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'ArrayReader': ArrayReader}
    exec(sol_code, scope)
    sol = scope['Solution']()

    reader = ArrayReader([-1, 0, 3, 5, 9, 12])
    assert sol.search(reader, 9) == 4
    assert sol.search(reader, 2) == -1
    print("✓ search-in-a-sorted-array-of-unknown-size passed")

if __name__ == '__main__':
    main()
