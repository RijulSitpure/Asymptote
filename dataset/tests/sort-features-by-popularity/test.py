class Solution:
    def sortFeatures(self, features: list[str], responses: list[str]) -> list[str]:
        feature_set = set(features)
        freq = {f: 0 for f in features}
        order = {f: i for i, f in enumerate(features)}

        for r in responses:
            words = set(r.split())
            for w in words:
                if w in freq:
                    freq[w] += 1

        return sorted(features, key=lambda f: (-freq[f], order[f]))

def test():
    sol = Solution()
    assert sol.sortFeatures(["cooler","lock","touch"], ["i like cooler cooler","lock touch cool","locker like touch"]) == ["touch","cooler","lock"]
    assert sol.sortFeatures(["a","aa","b","c"], ["a","a aa","a a a a aa","b a"]) == ["a","aa","b","c"]

    print("✓ sort-features-by-popularity passed")

if __name__ == '__main__':
    test()
