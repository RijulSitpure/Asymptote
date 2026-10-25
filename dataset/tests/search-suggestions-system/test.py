import bisect

class Solution:
    def suggestedProducts(self, products: list[str], searchWord: str) -> list[list[str]]:
        products.sort()
        res = []
        prefix = ""
        for ch in searchWord:
            prefix += ch
            idx = bisect.bisect_left(products, prefix)
            suggestions = []
            for i in range(idx, min(idx + 3, len(products))):
                if products[i].startswith(prefix):
                    suggestions.append(products[i])
                else:
                    break
            res.append(suggestions)
        return res

def test():
    sol = Solution()
    prods = ["mobile","mouse","moneypot","monitor","mousepad"]
    w = "mouse"
    res = sol.suggestedProducts(prods, w)
    assert res[0] == ["mobile","moneypot","monitor"], "test 1 prefix m failed"
    assert res[-1] == ["mouse","mousepad"], "test 1 prefix mouse failed"
    print("✓ search-suggestions-system passed")

if __name__ == "__main__":
    test()
