with invoice_totals as (
    select
        p.invoice_id,
        sum(p.quantity * pr.price) as total_price
    from Purchases p
    join Products pr on p.product_id = pr.product_id
    group by p.invoice_id
    order by total_price desc, p.invoice_id asc
    limit 1
)
select
    p.product_id,
    p.quantity,
    p.quantity * pr.price as price
from Purchases p
join Products pr on p.product_id = pr.product_id
where p.invoice_id = (select invoice_id from invoice_totals);