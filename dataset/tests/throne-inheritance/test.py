class ThroneInheritance:
    def __init__(self, kingName: str):
        self.king = kingName
        self.children = {kingName: []}
        self.dead = set()

    def birth(self, parentName: str, childName: str) -> None:
        if parentName not in self.children: self.children[parentName] = []
        self.children[parentName].append(childName)
        self.children[childName] = []

    def death(self, name: str) -> None:
        self.dead.add(name)

    def getInheritanceOrder(self) -> list[str]:
        ans = []
        def dfs(name):
            if name not in self.dead: ans.append(name)
            for child in self.children.get(name, []): dfs(child)
        dfs(self.king)
        return ans

t = ThroneInheritance("king")
t.birth("king", "andy")
t.birth("king", "bob")
t.birth("king", "catherine")
t.birth("andy", "matthew")
t.birth("bob", "alex")
t.birth("bob", "asha")
assert t.getInheritanceOrder() == ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"]
t.death("bob")
assert t.getInheritanceOrder() == ["king", "andy", "matthew", "alex", "asha", "catherine"]
print("All tests passed successfully.")
