# Job data API and compliance

## Recommendation

Use a layered, rights-aware job supply:

1. curated public ATS boards for a bounded company/role list;
2. direct employer/board partnerships;
3. one licensed aggregator pilot when coverage economics are understood;
4. no restricted-site scraping as the core source.

Every job needs provenance and lifecycle fields. Technical accessibility is not commercial permission.

No primary-source evidence reviewed in this sprint established which job-data provider Teal currently uses. Teal's own help center says its jobs are sourced directly from ATSs and ingested almost hourly, but that does not identify a licensed upstream vendor. Do not repeat third-party speculation as fact ([Teal job-search help](https://help.tealhq.com/en/articles/13456939-using-teal-s-job-search)).

## Provider matrix

| Source | Official API | Auth/partner model | Public pricing/limits | Freshness/expiry | Rights and restrictions | Geography | Complexity | Suitability |
|---|---|---|---|---|---|---|---|---|
| [Greenhouse Job Board](https://developer.greenhouse.io/job-board.html) | Yes; per board | Public GET by board token; application POST needs employer API key | Public GET terms/limits not presented as universal feed | `updated_at`; currently published board jobs; HireNudge must recheck/delete | Public display endpoint is not blanket redistribution/auto-apply approval | Employer footprint | Medium at scale across boards | **High for curated direct-ATS ingestion; low for universal apply** |
| [Ashby public job postings](https://developers.ashbyhq.com/docs/public-job-posting-api) | Yes; per board | Public job-board endpoint; authenticated list for customers | No universal feed pricing | Published jobs, optional compensation; recheck board | Per-company public postings; downstream licence/attribution still review | Employer footprint | Medium | **High for curated boards** |
| [Lever Postings API](https://github.com/lever/postings-api) | Yes; per company | Public postings; application/partner behavior varies | No universal feed price | Listings/pagination; build deletion recheck | Do not assume application right or global redistribution | Employer footprint | Medium | **Medium-high for curated boards** |
| [Workable careers-page API](https://help.workable.com/hc/en-us/articles/115012771647-Using-the-Workable-API-to-create-a-careers-page) | Yes, customer oriented | Workable account/customer workflows | Commercial details via Workable | Careers-page jobs; lifecycle must be polled | Intended for customer careers pages, not general scraping | Broad employer footprint | Medium-high | **Partner/direct-employer only** |
| [Fantastic Jobs](https://fantastic.jobs/api) | Yes; aggregate API | API key/subscription | `$95/20k` to `$750/500k` monthly tiers displayed; expiry/modified endpoints at higher tiers | Provider claims hourly sourcing and 1–2h ingestion; expired/modified endpoints | Aggregator terms; upstream provenance, LinkedIn-derived data and commercial rights need counsel/contract | Provider claims broad coverage | Low-medium technical; high diligence | **Pilot candidate only after contract/provenance review** |
| [Apify](https://apify.com/pricing) actors | Platform/actors | API token; actor-specific | Free `$5` credit; Starter `$29`, Scale `$199`, Business `$999` displayed | Actor dependent; deletion often custom | Platform access does not grant target-site rights; job actor advertises scraping including LinkedIn | Target dependent | High operational variability | **Not core; target-by-target legal/quality exception only** |
| [Adzuna](https://developer.adzuna.com/docs/terms_of_service) | Yes | App credentials; commercial licence may be required | Default 25/min, 250/day, 1,000/week, 2,500/month in public terms | API-fed; HireNudge still needs expiry policy | Attribution/linking and commercial-use restrictions; written consent/licence can apply | Multi-country | Medium | **Potential licensed pilot** |
| [Jooble](https://help.jooble.org/en/support/solutions/articles/60001448238-rest-api-documentation) | Yes | API key via partnership | Commercial pricing/rights not public | Response fields available; lifecycle SLA not established | Contract needed for commercial display, retention and deletion | International | Medium | **Requires partner conversation** |

`Fantastic Jobs` prices are the provider's displayed prices on 6 August 2026, not a quote to HireNudge. Reconfirm before procurement.

## Required job schema

- internal canonical job ID and source job ID;
- source/provider and canonical employer;
- source URL and application URL;
- publisher-posted, provider-ingested, HireNudge-fetched and last-source-verified timestamps;
- first seen, last seen, expires-at and removed-at;
- removal reason: source gone, explicit expiry, employer takedown, duplicate, policy, quality;
- raw title/location plus normalized title/location/work mode;
- employment type, compensation and currency with source;
- work-authorization/sponsorship statement with exact evidence and date;
- duplicate-group ID and canonical winner;
- content hash/version and material-change timestamp;
- rights/licence class, attribution requirement and retention rule.

## Freshness and deletion

- Recheck high-intent/recent jobs more often than the long tail.
- Mark `unverified` when the source cannot be reached; do not silently call it active.
- Remove from discovery immediately when source is gone; retain minimal audit record per contract.
- Before a user starts a packet or clicks apply, run a source check when feasible.
- Show `posted`, `last verified` and source separately; provider ingestion time is not employer post time.
- Maintain employer/provider takedown channel and SLA.

## Deduplication

Use deterministic source IDs first, then normalized employer/title/location/application URL, then semantic similarity. Preserve variants when location, level, requisition or authorization differs. Evaluate precision and recall on a manually labeled set; false merges can hide relevant roles, false splits create spam.

## Security and privacy

- Keep provider keys server-side with rotation and least privilege.
- Separate public job content from candidate preferences and application history.
- Do not leak candidate queries/resumes to job providers unless contracted and disclosed.
- Log source fetch, transformation and removal decisions.
- Review robots/TOS/contracts per source; counsel decides commercial use.

## Validation plan

For a 500-job role/country sample, measure source reachability, age, duplicates, location correctness, role relevance, sponsorship evidence and time-to-removal. Compare curated ATS and one licensed aggregator on quality and cost per saved qualified job—not raw job count.

Related initiative: HN-006.
