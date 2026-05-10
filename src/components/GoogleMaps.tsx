export default function GoogleMaps() {
  return (
    <div className="h-full min-h-[22rem] overflow-hidden rounded-2xl border border-border bg-surface-dark shadow-theme-lg lg:min-h-[28rem]">
      <iframe
        title="Caraíba Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194.46813340596964!2d-9.17224834171658!3d38.75246087886587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193370edc4cd57%3A0xf5a7ccdc5c9b8164!2sCARAIBA!5e0!3m2!1sen!2spt!4v1778350336376!5m2!1sen!2spt"
        width="100%"
        height="100%"
        className="block min-h-[22rem] w-full lg:min-h-[28rem]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
