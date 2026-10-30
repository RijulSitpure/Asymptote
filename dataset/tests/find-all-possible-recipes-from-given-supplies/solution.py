from collections import defaultdict, deque

class Solution:
    def findAllRecipes(self, recipes: list[str], ingredients: list[list[str]], supplies: list[str]) -> list[str]:
        supply_set = set(supplies)
        adj = defaultdict(list)
        in_degree = defaultdict(int)
        recipe_set = set(recipes)

        for r, ing_list in zip(recipes, ingredients):
            for ing in ing_list:
                if ing not in supply_set:
                    adj[ing].append(r)
                    in_degree[r] += 1

        queue = deque([r for r in recipes if in_degree[r] == 0])
        created = []

        while queue:
            curr = queue.popleft()
            created.append(curr)

            for dependent in adj[curr]:
                in_degree[dependent] -= 1
                if in_degree[dependent] == 0:
                    queue.append(dependent)

        return created
