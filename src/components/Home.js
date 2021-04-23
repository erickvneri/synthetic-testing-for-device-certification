import '../App.scss';

function Home() {
  return (
    <div className='container is-mobile'>
      <section id='welcome-page' className='content'>
        <h1 className='title is-3'>Synthetic Testing for Device Certification</h1>
        <br/>
        <h2 className='subtitle'>Device Selection</h2>

        <p>
          This section displays a brief information of the devices at your location or locations where<br/>
          you've been invited. You may select one of them to move into the next stage.
        </p>
        <br/>

        <h2 className='subtitle'>Device Detail</h2>
        <p>
          At this page, you'll get a full detail of the device you're about to submit for testing. Such<br/>
          information includes a timestamp of when the device was created, the location where it has been <br/>
          installed, and even the components and capabilities that it is supporting. <br/>
        </p>
        <br/>

        <h2 className='subtitle'>Test Assessment</h2>
        <p>
          Once you've clicked the "<storng>Run Tests</storng>" button, you'll be redirected to this final section<br/>
          and tests will automatically run, and as soon as the server is ready, test results will be displayed at the<br/>
          table.
          <br/>
          <br/>
          Also, as it is important to reevaluate, you can download the results into a <i>CSV</i> file and then run the<br/>
          tests as you need.
        </p>
        <br/>
      </section>
    </div>
  )
}

export default Home;
