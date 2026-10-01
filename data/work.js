module.exports = [
  {
    slug: 'gas-order-platform',
    title: 'Gas order platform',
    summary:
      'One order pipeline for a website and a mobile app, on a locked-down Azure landing zone.',
    problem:
      'Orders had to come from a website and a mobile app without a separate backend for each client. The platform also had to live inside an Azure landing zone, with a controlled public edge.',
    approach:
      'I designed an event-driven core on Azure Service Bus, with CQRS and a backend-for-frontend behind an API gateway. Clients talk to the gateway. The domain publishes events. Infrastructure is Terraform, following landing zone rules. Azure Front Door and a WAF sit on the edge, and customers sign in with Entra External ID. A Python service lets staff ask questions of the order data in plain language.',
    outcome:
      'The website and the mobile app share one order pipeline. Infrastructure is created from code, and public traffic enters through Front Door rather than an open app service.',
  },
  {
    slug: 'sitecore-azure-marketplace',
    title: 'Sitecore on the Azure Marketplace',
    summary: 'Customers deploy Sitecore into their own Azure subscription from the portal.',
    problem:
      'Standing up Sitecore XP in Azure was a long manual infrastructure job. Most customers could not repeat it, and Sitecore could not do it inside their subscriptions for them.',
    approach:
      'I built the Marketplace offer: an Angular form for the deployment options, a .NET API, and ARM templates that provision Sitecore into the customer subscription. Microsoft Graph handles the Azure sign-in and the resource calls.',
    outcome:
      'A customer can deploy Sitecore XP from the Azure Marketplace into their own subscription, instead of assembling the platform by hand.',
  },
  {
    slug: 'vehicle-access-billing',
    title: 'Vehicle access and billing',
    summary:
      'Plate-recognition events become access decisions and billing records without one slow call blocking the gate.',
    problem:
      'Gate hardware, a plate-recognition service, and billing all had to see the same vehicle event. A slow call to one vendor could not hold up the gate or the other sites.',
    approach:
      'I led a .NET 8 system split into an API, a RabbitMQ worker, and a Blazor portal. Each gate has its own queue. Cardax, ThatCar, and Milestone are called with retries, backoff, and certificate-based connections.',
    outcome:
      'Each gate keeps its own queue, so one slow integration does not block the others. Operators work from one portal instead of three vendor consoles.',
  },
]
