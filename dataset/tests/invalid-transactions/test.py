from collections import defaultdict

class Solution:
    def invalidTransactions(self, transactions: list[str]) -> list[str]:
        parsed = []
        name_map = defaultdict(list)
        
        for i, t in enumerate(transactions):
            name, time_str, amount_str, city = t.split(",")
            time, amount = int(time_str), int(amount_str)
            parsed.append((name, time, amount, city))
            name_map[name].append(i)
        
        invalid_indices = set()
        for i, (name, time, amount, city) in enumerate(parsed):
            if amount > 1000:
                invalid_indices.add(i)
            for j in name_map[name]:
                if i != j:
                    other_time, other_city = parsed[j][1], parsed[j][3]
                    if other_city != city and abs(time - other_time) <= 60:
                        invalid_indices.add(i)
                        invalid_indices.add(j)
        
        return [transactions[i] for i in invalid_indices]

def test():
    sol = Solution()
    t1 = ["alice,20,800,mtv","alice,50,100,beijing"]
    assert sorted(sol.invalidTransactions(t1)) == sorted(["alice,20,800,mtv","alice,50,100,beijing"]), "test 1 failed"
    t2 = ["alice,20,800,mtv","alice,50,1200,mtv"]
    assert sol.invalidTransactions(t2) == ["alice,50,1200,mtv"], "test 2 failed"
    t3 = ["alice,20,800,mtv","bob,50,1200,mtv"]
    assert sol.invalidTransactions(t3) == ["bob,50,1200,mtv"], "test 3 failed"
    print("✓ invalid-transactions passed")

if __name__ == "__main__":
    test()
