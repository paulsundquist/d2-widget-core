package com.paulsundquist.d2.widget.VdocExport;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.documentum.fc.client.DfClient;
import com.documentum.fc.client.DfQuery;
import com.documentum.fc.client.IDfClient;
import com.documentum.fc.client.IDfCollection;
import com.documentum.fc.client.IDfPersistentObject;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.client.IDfSessionManager;
import com.documentum.fc.client.IDfSysObject;
import com.documentum.fc.common.DfException;
import com.documentum.fc.common.DfId;
import com.documentum.fc.common.DfLoginInfo;

/**
 * Servlet implementation class VdocExport
 */
@WebServlet("/VdocExport/exportVdoc")
public class VdocExport extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public VdocExport() {
		super();
		// TODO Auto-generated constructor stub
	};

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		

		String DOCBASE = request.getParameter("DOCBASE");
		String USER = request.getParameter("USER");
		String TICKET = request.getParameter("TICKET");
		String top_r_object_id = request.getParameter("r_object_id");
		String export_dir = request.getParameter("export_dir");

		if (DOCBASE == null || USER == null || TICKET == null || top_r_object_id == null || export_dir == null) {

			response.getWriter()
					.append("You must supply parameters:  DOCBASE, USER, TICKET, r_object_id, export_dir");

			return;
		}

		String sQuery = "select r_object_id,object_name,depth,parent from dm_document(all)  "
				+ "IN DOCUMENT ID('" + top_r_object_id + "') DESCEND";
		DfQuery query = new DfQuery();
		query.setDQL(sQuery);
		IDfCollection colObjects;
		IDfSession session = null;
		HashMap<String, String> mapObjectPath = new HashMap<String, String>();
		
		int documents_exported = 0;

		try {

			session = connect(DOCBASE, USER, TICKET);

			colObjects = query.execute(session, DfQuery.DF_READ_QUERY);

			while (colObjects.next()) {
				String r_object_id = colObjects.getString("r_object_id");
				String object_name = colObjects.getString("object_name");
				int depth = colObjects.getInt("depth");
				String parent = colObjects.getString("parent");

				// store the current location
				String thisPath = "";
				if (depth == 0) {
					mapObjectPath.put(r_object_id, "/" + object_name);
				} else {
					String parentPath = mapObjectPath.get(parent);

					thisPath = parentPath + "/" + object_name;

					mapObjectPath.put(r_object_id, thisPath);

					String fullPath = "c:/data/export/" + export_dir + "/" + thisPath + ".pdf";

					

					IDfSysObject sysObject = (IDfSysObject) session
							.getObject(new DfId(r_object_id));

					try {
						Path pathToFile = Paths.get(fullPath);
						Files.createDirectories(pathToFile.getParent());
						

						// TODO: instead of doing a getfile, it should ask D2
						// for the correct export C2 configuration
						
					
						
						if (sysObject.getContentSize() > 0 ){
							//TODO:  put this into an export log
							System.out.format("Exporting depth(%d):%s %s to %s\n", depth, r_object_id,
									object_name, fullPath);
							
							
							sysObject.getFileEx(fullPath, "pdf", 0, false);
							
							// count
							documents_exported++;
						}
						
						
						
					} catch (Exception e) {
						
						//TODO:  put this into an export log
						System.out.println("Error exporting " + r_object_id + e.getMessage());
					}

				}// depth != 0

			}

			colObjects.close();

			if (session != null) {
				session.disconnect();
			}

		} catch (DfException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}
		
		
		response.getWriter().append("Documents Exported: "  + documents_exported);

	}

	public static IDfSession connect(String sDocbase, String sUser, String sPwd) throws Exception {

		IDfClient client = DfClient.getLocalClient();
		DfLoginInfo loginInfo = new DfLoginInfo();

		loginInfo.setUser(sUser);
		IDfSessionManager m_sessionMgr = client.newSessionManager();
		m_sessionMgr.setIdentity(sDocbase, loginInfo);
		loginInfo.setPassword(sPwd);
		return (client.newSession(sDocbase, loginInfo));

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
