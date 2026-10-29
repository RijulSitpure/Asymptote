from collections import defaultdict

class Solution:
    def displayTable(self, orders: list[list[str]]) -> list[list[str]]:
        foods = set()
        tables = defaultdict(lambda: defaultdict(int))

        for _, tbl, food in orders:
            foods.add(food)
            tables[int(tbl)][food] += 1

        sorted_foods = sorted(foods)
        res = [["Table"] + sorted_foods]

        for tbl in sorted(tables.keys()):
            row = [str(tbl)]
            for f in sorted_foods:
                row.append(str(tables[tbl][f]))
            res.append(row)
        return res

sol = Solution()
orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
ans = sol.displayTable(orders)
assert ans[0] == ["Table","Beef Burrito","Ceviche","Fried Chicken","Water"]
assert ans[1] == ["3","0","2","1","0"]
assert ans[2] == ["5","0","1","0","1"]
assert ans[3] == ["10","1","0","0","0"]
print("All tests passed successfully.")
