class MockArrayReader:
    def __init__(self, arr):
        self.arr = arr
    def length(self):
        return len(self.arr)
    def query(self, a, b, c, d):
        vals = [self.arr[a], self.arr[b], self.arr[c], self.arr[d]]
        c0 = vals.count(vals[0])
        return 4 if c0 == 4 else (2 if c0 == 2 else 0)

class Solution:
    def guessMajority(self, reader) -> int:
        n = reader.length()
        q0123 = reader.query(0, 1, 2, 3)
        q0124 = reader.query(0, 1, 2, 4)
        same = [0] * n
        same[3] = 1
        for i in range(4, n):
            same[i] = 1 if reader.query(0, 1, 2, i) == q0123 else 0
        same[2] = 1 if reader.query(0, 1, 3, 4) == q0124 else 0
        same[1] = 1 if reader.query(0, 2, 3, 4) == q0124 else 0
        same[0] = 1 if reader.query(1, 2, 3, 4) == q0124 else 0
        cnt_same = sum(same)
        cnt_diff = n - cnt_same
        if cnt_same > cnt_diff: return 3
        elif cnt_diff > cnt_same:
            for i in range(n):
                if same[i] == 0: return i
        return -1

sol = Solution()
r1 = MockArrayReader([0,0,1,0,1,1,1,1])
ans = sol.guessMajority(r1)
assert r1.arr[ans] == 1
print("All tests passed successfully.")
